import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { deleteFromCloudinary } from '../utils/upload';

interface IResponce {
  success: boolean,
  message: string,
  data?: any
}

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    console.log(users);
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({success: false, message: "error in getUser", data: error} as IResponce);
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Delete avatar from Cloudinary if it exists and is not the default
    if (user.avatar?.publicId && user.avatar.publicId !== 'default-avatar') {
      await deleteFromCloudinary(user.avatar.publicId);
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting user', error });

  }
}