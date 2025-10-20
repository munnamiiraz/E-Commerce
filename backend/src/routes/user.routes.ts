import { Router } from 'express';
import { placeOrder, getUser, signIn, signUp, addToCart, deleteFromCart, getCart } from '../controllers/user.controller';
import authUser from '../middleware/authUser';

const router = Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/get-profile", authUser, getUser as any)
router.post("/add-product", authUser, getUser as any)
router.post("/place-order", authUser, placeOrder as any)
router.post("/add-to-cart", authUser, addToCart as any)
router.post("/remove-from-cart", authUser, deleteFromCart as any)
router.get("/get-cart", authUser, getCart as any)


export default router;