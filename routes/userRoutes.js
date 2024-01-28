import express from 'express';
import {
  authUser,
  logoutUser,
  registerUser,
  updateProfile,
  userProfile,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, userProfile)
  .patch(protect, updateProfile);

export default router;
