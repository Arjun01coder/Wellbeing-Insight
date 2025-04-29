import express from 'express';
import { idolController } from '../controllers/idolController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/featured', idolController.getFeaturedIdols);
router.get('/fitness', idolController.getFitnessIdols); // Making these public for development
router.get('/appearance', idolController.getAppearanceIdols);
router.get('/personality', idolController.getPersonalityIdols);

// Protected routes
router.use(authMiddleware);
router.get('/', idolController.getUserIdols);
router.post('/', idolController.addIdol);
router.put('/:idolId', idolController.updateIdol);
router.delete('/:idolId', idolController.deleteIdol);
// Moving these above to be public endpoints
// router.get('/fitness', idolController.getFitnessIdols);
// router.get('/appearance', idolController.getAppearanceIdols);
// router.get('/personality', idolController.getPersonalityIdols);

export default router;