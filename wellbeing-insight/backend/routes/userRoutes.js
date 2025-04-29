import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/dashboard', userController.getDashboardData); // Making dashboard public for development

// Protected routes
router.use(authMiddleware);
router.get('/me', userController.getCurrentUser);
router.put('/profile', userController.updateProfile);
// router.get('/dashboard', userController.getDashboardData); // Moved above to be public

export default router;