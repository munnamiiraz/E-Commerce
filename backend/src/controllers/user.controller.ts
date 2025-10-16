import { Request, Response } from 'express';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';
import getPrisma from '../config/prisma';
import { AuthRequest } from '@/types/express';
import { userPublicFields } from '../utils/prismaSelector';
const prisma = getPrisma();

export interface OrderItemInput {
  productId: string;
  quantity: number;
}
export interface ShippingAddressInput {
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
}
export interface CreateOrderRequestBody {
  items: OrderItemInput;
  shippingAddress?: ShippingAddressInput | null;
  paymentMethod?: "card" | "cod" | "wallet" | string;
}


interface ISignIn {
  statusCode: number
  data: {
    user: {
      id: string
      name: string,
      email: string,
      avatarUrl: string,
      cover: string,
      phone: string,
      address: string,
      points: number,
      totalOrders: number,
      totalReviews: number,
      designation: string,
      createdAt: Date
    }
  },
  token: string
}

interface IProduct {
  id: string,
  title: string,
  quantity: number,
  originalPrice: number,
  discountPrice: number,
}

interface IPlaceOrder {
  deliveryAddress : {
    address: string,
    city: string,
    name: string,
    phone: string
    zip: string
  },
  orderDetails: {
    items: IProduct[],
    shipping: number,
    subtotal: number,
    tax: number,
    total: number
  },
  paymentMethod: string,
  timestamp: Date
}


export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }
    if(!validator.isEmail(email)) {
      res.status(400).json(new ApiError(401, "Enter a valid email"));
      return;
    }

    if (password.length < 8) {
      res.status(400).json(new ApiError(400, "Enter a strong password (min 8 chars)"));
      return;
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = await prisma.user.findUnique({
      where: {email: email}
    })

    if(user) {
      res.status(400).json(new ApiError(400, "User already exists"));
      return;
    }



    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
  } catch (error) {
    console.error('SignUp error:', error);
    res.status(500).json(new ApiError(500, 'Error creating user'));
  }
};


export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: {email: string, password: string} = req.body;
    if(!email || !password) {
      res.status(401).json(new ApiError(401, "All fields are required"));
      return;
    }

    const user = await prisma.user.findUnique({
      where: {email: email}
    })

    if(!user) {
      res.status(404).json(new ApiError(404, "User not found"));
      return;
    }

    const isMatched: boolean = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(401).json(new ApiError(401, "Invalid credentials"));
      return;
    }
    const token: string = jwt.sign(
      { _id: String(user.id) }, 
      process.env.JWT_SECRET as string
    );

    res.status(200).json(new ApiResponse(200, {user, token}, "User logged in successfully"));

  } catch (error) {
    console.error('SignIn error:', error);
    res.status(500).json(new ApiError(500, 'Error signing in user'));
  }
}


export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user;
    // console.log("hi");
    // console.log(currentUser);
    
    
    const user = await prisma.user.findUnique({
      where: {id: currentUser._id},
      select: userPublicFields
    })

    if(!user) {
      res.status(401).json(new ApiError(401, "User not found"));
      return;
    }
    console.log(user);
    
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));


  } catch (error) {
    console.error('getUser error:', error);
    res.status(500).json(new ApiError(500, 'Error getting user'));
  }
}

export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user;
    if (!currentUser?._id) {
      res.status(401).json(new ApiError(401, "Unauthorized"));
      return;
    }

    const body = req.body as IPlaceOrder;
    const deliveryAddress = body.deliveryAddress;
    const orderDetails = body.orderDetails;
    const paymentMethod = body.paymentMethod;
    const timestamp = body.timestamp ? new Date(body.timestamp) : new Date();

    if (!orderDetails || !Array.isArray(orderDetails.items) || orderDetails.items.length === 0) {
      res.status(400).json(new ApiError(400, "orderDetails.items is required and cannot be empty"));
      return;
    }

    const items = orderDetails.items;

    // Validate items shape
    for (const it of items) {
      if (!it.id || typeof it.id !== "string") {
        res.status(400).json(new ApiError(400, "Each item must have a valid id (product id)"));
        return;
      }
      if (!Number.isInteger(it.quantity) || it.quantity <= 0) {
        res.status(400).json(new ApiError(400, "Each item must have a positive integer quantity"));
        return;
      }
      // price may be number (float/int) — we'll round to integer because schema.price is Int
      if (typeof it.discountPrice !== "number") {
        res.status(400).json(new ApiError(400, "Each item must provide a numeric price"));
        return;
      }
    }

    const productIds = items.map((i: any) => i.id);

    // fetch all products referenced
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, quantity: true, discountPrice: true , originalPrice: true, title: true, sellerId: true },
    });

    if (products.length !== productIds.length) {
      const found = new Set(products.map((p) => p.id));
      const missing = productIds.filter((id) => !found.has(id));
      res.status(400).json(new ApiError(400, `Products not found: ${missing.join(", ")}`));
      return;
    }

    // map for lookup
    const prodMap = new Map(products.map((p) => [p.id, p]));

    // stock checks & prepare aggregated per-seller updates
    const sellerRevenueMap = new Map<string, number>();
    const sellerOrderCountMap = new Map<string, number>();
    let totalOrderRows = 0;

    for (const it of items) {
      const prod = prodMap.get(it.id)!;
      if (prod.quantity < it.quantity) {
        res.status(400).json(new ApiError(400, `Insufficient stock for ${prod.title || prod.id}. Available: ${prod.quantity}, requested: ${it.quantity}`));
        return;
      }

      const linePriceInt = Math.round(it.discountPrice || it.originalPrice); // schema expects Int
      const lineTotal = linePriceInt * it.quantity;

      // accumulate seller revenue & order counts
      const sellerId = prod.sellerId;
      sellerRevenueMap.set(sellerId, (sellerRevenueMap.get(sellerId) ?? 0) + lineTotal);
      sellerOrderCountMap.set(sellerId, (sellerOrderCountMap.get(sellerId) ?? 0) + 1);

      totalOrderRows += 1;
    }

    // perform transaction: create Order rows (one per item), decrement stocks, update seller/user counters
    const createdOrders = await prisma.$transaction(async (tx) => {
      const created: any[] = [];

      // create each order row and decrement stock
      for (const it of items) {
        const prod = prodMap.get(it.id)!;

        const createdOrder = await tx.order.create({
          data: {
            // ক্লায়েন্ট পাঠানো external-order-id এখানে সংরক্ষণ করার ক্ষেত্র নেই (schema তে), তাই আমরা omit করছি.
            // যদি তুমি external order id রাখতে চাও, প্রথমে schema আপডেট করে একটি ফিল্ড যোগ করো।
            orderedById: currentUser._id,
            sendById: prod.sellerId,
            productId: prod.id,
            quantity: it.quantity,
            price: Math.round(it.discountPrice || it.originalPrice), // snapshot price (Int)
            status: "PROCESSING", // default initial status; adjust as needed
            createdAt: timestamp,
          },
        });

        // decrement product stock
        await tx.product.update({
          where: { id: prod.id },
          data: {
            quantity: { decrement: it.quantity },
          },
        });

        created.push(createdOrder);
      }

      // update sellers aggregated (totalRevenue, totalOrders)
      for (const [sellerId, revenue] of sellerRevenueMap.entries()) {
        const ordersCount = sellerOrderCountMap.get(sellerId) ?? 0;
        await tx.seller.update({
          where: { id: sellerId },
          data: {
            totalRevenue: { increment: Math.round(revenue) },
            totalOrders: { increment: ordersCount },
          },
        });
      }

      // update user totalOrders (we increment by number of order rows created; change logic if you prefer)
      if (totalOrderRows > 0) {
        await tx.user.update({
          where: { id: currentUser._id },
          data: {
            totalOrders: { increment: totalOrderRows },
          },
        });
      }

      return created;
    });

    // response: created order rows
    res.status(201).json(new ApiResponse(201, { orders: createdOrders }, "Order(s) created successfully"));
  } catch (err) {
    console.error("placeOrder error:", err);
    res.status(500).json(new ApiError(500, "Failed to create order"));
  }
};
