import { Request, Response } from 'express';
import prisma from '../config/prisma';


interface IResponce {
  success: boolean,
  message: string,
  data?: any
}


export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error creating user" 
    });
  }
};


export default prisma