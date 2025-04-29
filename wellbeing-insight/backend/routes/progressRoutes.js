<<<<<<< HEAD
import express from 'express';
import { progressController } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All progress routes require authentication
router.use(authMiddleware);

// Progress tracking endpoints
router.get('/', progressController.getUserProgress);
router.post('/', progressController.updateProgress);
router.get('/fitness', progressController.getFitnessProgress);
router.get('/appearance', progressController.getAppearanceProgress);
router.get('/personality', progressController.getPersonalityProgress);
router.post('/log-activity', progressController.logActivity);

=======
import express from 'express';
import { progressController } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All progress routes require authentication
router.use(authMiddleware);

// Progress tracking endpoints
router.get('/', progressController.getUserProgress);
router.post('/', progressController.updateProgress);
router.get('/fitness', progressController.getFitnessProgress);
router.get('/appearance', progressController.getAppearanceProgress);
router.get('/personality', progressController.getPersonalityProgress);
router.post('/log-activity', progressController.logActivity);

>>>>>>> eee5085621a6e360c16703447618111aa5199450
export default router;