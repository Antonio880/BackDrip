import { Router } from 'express';
import { generateToken, loginUser } from '../middlewares/AuthController';

const router = Router();

router.post('/auth/token', generateToken);
router.post('/auth/login', loginUser);

export default router;
