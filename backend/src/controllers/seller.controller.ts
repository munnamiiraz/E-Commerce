import { Request, Response } from 'express';

import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';

import multer from 'multer';
import getPrisma from '../config/prisma';
import { AuthRequest } from '@/types/express';
import { uploadBufferToCloudinary } from "../utils/upload";
import { PrismaClient  } from '@prisma/client';
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

    res.status(201).json({ success: true, product: created });
    return 
  } catch (err: any) {
    console.error('Product create error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
    return 
  }
}