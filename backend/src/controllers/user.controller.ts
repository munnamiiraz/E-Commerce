import { Request, Response } from 'express';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';
import getPrisma from '../config/prisma';
const prisma = getPrisma();

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }
    if(!validator.isEmail(email)) {
      res.status(400).json(new ApiError(400, "Enter a valid email"));
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
    const { email, password } = req.body;
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

    res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));

  } catch (error) {
    
  }
}
