import express from 'express';
import { user } from '../../Controller';

const router = express.Router();

router.route('/reset-password').post(user.resetPassword);
router.route('/verification').post(user.verifyEmail);

export default router;
