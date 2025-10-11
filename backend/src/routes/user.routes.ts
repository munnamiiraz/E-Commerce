import { Router } from 'express';
import { getUsers, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/all-users', getUsers);
router.delete('/delete-user/:id', deleteUser);


export default router;