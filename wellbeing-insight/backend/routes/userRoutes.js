<<<<<<< HEAD
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

=======
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

>>>>>>> eee5085621a6e360c16703447618111aa5199450
export default router;