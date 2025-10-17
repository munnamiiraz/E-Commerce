import { Router } from 'express';
import { placeOrder } from '../controllers/user.controller';
import { getSellerInfo, signIn, signUp } from '../controllers/seller.controller';
import authSeller from '../middleware/authSeller';
import { upload } from '../config/multer';
import { addProduct, getProduct } from '../controllers/seller.controller';

const router = Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/get-product", authSeller, getProduct as any)
router.get("/get-seller-info", authSeller, getSellerInfo as any)
// router.post("/place-order", authSeller, upload.array('images', 4), placeOrder as any)
router.post("/add-product", authSeller, upload.array('images', 4), addProduct as any)


export default router;