import { Request, Response } from 'express';

import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';

import multer from 'multer';
import getPrisma from '../config/prisma';
import { AuthRequest } from '@/types/express';
import { uploadBufferToCloudinary } from "../utils/upload";
import { PrismaClient  } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"

const prisma = new PrismaClient();
// multer memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB per file (adjust)
});

// augment Request type if you use auth middleware that sets req.user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: { id: string };
//     }
//   }
// }
type SpecInput = { key?: string; value?: string } | Record<string, any>;

interface ISignUp {
  name: string,
  email: string,
  password: string,
  description: string,
  phone: string,
  address: string,
}

interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  images: {
    url: string;
    publicId: string;
  }[];
  specifications: {
    key: string;
    value: string;
  }[];
}


function sanitizeString(str: string) {
  return str.replace(/\u0000/g, '').trim();
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, description, phone, address} = req.body;
    if(!name || !email || !password || !description || !phone || !address) {
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

    const user = await prisma.seller.findUnique({
      where: {email: email}
    })

    if(user) {
      res.status(400).json(new ApiError(400, "User already exists"));
      return;
    }

    const newUser = await prisma.seller.create({
      data: { name, email, password: hashedPassword, description, phone, address }
    });

    res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
  } catch (error) {
    console.error('SignUp error:', error);
    res.status(500).json(new ApiError(500, 'Error creating seller'));
  }
};



export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json(new ApiError(400, "Email and password are required"));
      return;
    }

    const user = await prisma.seller.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json(new ApiError(404, "User not found"));
      return;
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json(new ApiError(401, "Invalid email or password"));
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Strip sensitive info before sending user data
    const { password: _, ...safeUser } = user;

    res
      .status(200)
      .json(new ApiResponse(200, { user: safeUser, token }, "Login successful"));
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json(new ApiError(500, "Internal server error"));
  }
};


export const addProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      category,
      originalPrice,
      discountPrice,
      quantity,
      specifications,
      sellerId,
    } = req.body;

    if (!title || !category) {
      res.status(400).json({ success: false, message: 'title and category required' });
      return 
    }

    // parse specs
    let specsArray: SpecInput[] = [];
    try {
      specsArray = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
      if (!Array.isArray(specsArray)) throw new Error('specifications must be an array');
    } catch (err: any) {
      res.status(400).json({ success: false, message: 'Invalid specifications JSON', error: err.message });
      return 
    }

    const originalPriceInt = Math.round(parseFloat(originalPrice || '0') * 100);
    const discountPriceInt = Math.round(parseFloat(discountPrice || '0') * 100);
    const quantityInt = parseInt(quantity || '0', 10);

    // files from memory
    const files = (req.files as Express.Multer.File[]) || [];

    // upload all buffers concurrently
    const uploaded = await Promise.all(
      files.map(async (f) => {
        if (!f.buffer) throw new Error('File buffer missing; are you using memoryStorage?');
        const r = await uploadBufferToCloudinary(f.buffer, f.originalname);
        return {
          url: r.url,
          publicId: r.publicId,
          filename: f.originalname,
          mimeType: f.mimetype,
          size: r.bytes ?? f.size,
        };
      })
    );

    const imagesCreate = uploaded.map((u) => ({
      url: u.url,
      publicId: u.publicId,
      filename: u.filename,
      mimeType: u.mimeType,
      size: u.size,
    }));

    const specsCreate = specsArray
      .map((s) => {
        const key = (s as any).key ?? (s as any).k ?? '';
        const value = (s as any).value ?? (s as any).v ?? (typeof s === 'string' ? s : JSON.stringify(s));
        return { key: String(key).trim(), value: String(value) };
      })
      .filter((s) => s.key);

    const sellerToConnect = (req.user && req.user.id) ?? sellerId;
    if (!sellerToConnect) {
      res.status(400).json({ success: false, message: 'sellerId missing or unauthenticated' });
      return 
    }

    const created = await prisma.product.create({
      data: {
        title,
        description,
        category,
        originalPrice: originalPriceInt,
        discountPrice: discountPriceInt,
        quantity: quantityInt,
        seller: { connect: { id: sellerToConnect } },
        images: imagesCreate.length ? { create: imagesCreate } : undefined,
        specifications: specsCreate.length ? { create: specsCreate } : undefined,
      },
      include: { images: true, specifications: true },
    });

    const seller = await prisma.seller.update({
      where: { id: sellerToConnect },
      data: {
        totalProducts: { increment: 1 },
      }
    });



    res.status(201).json({ success: true, product: created });
    return 
  } catch (err: any) {
    console.error('Product create error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
    return 
  }
}

export const getProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user

    const products = await prisma.product.findMany({
      where: { sellerId: user._id },
    });
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (err: any) {
    console.error('Product fetch error:', err);
    res.status(500).json(new ApiError(500, 'Server error'))
  }
}

export const getSellerInfo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user
    // console.log(user);
    
    // console.log(user._id);
    
    const seller = await prisma.seller.findUnique({
      where: { id: user.id },
    });
    res.status(200).json(new ApiResponse(200, seller, "Seller fetched successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ApiError(500, 'Server error'))
  }
}