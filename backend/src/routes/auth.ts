import { Router } from 'express';
import { login, getMe, logout, createAdmin, listAdmins } from '../controllers/authController';
import { protect, restrictTo } from '../middlewares/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/create-user', protect, restrictTo('admin'), createAdmin);
router.get('/users', protect, restrictTo('admin'), listAdmins);

export default router;
