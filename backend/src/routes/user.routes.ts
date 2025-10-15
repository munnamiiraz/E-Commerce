import { Router } from 'express';
import { placeOrder, getUser, signIn, signUp } from '../controllers/user.controller';
import authUser from '../middleware/authUser';

const router = Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/get-profile", authUser, getUser as any)
router.post("/place-order", authUser, placeOrder as any)


export default router;