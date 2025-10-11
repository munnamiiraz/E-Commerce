import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { register, login, updateProfile} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { upload } from '../config/multer';
import type { AuthFileRequest } from '../types/express';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.patch('/profile', protect, upload.single('avatar'), 
  (req: Request, res: Response, next: NextFunction) => {
    updateProfile(req as AuthFileRequest, res).catch(next);
  });

export default router;