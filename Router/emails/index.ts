import express from 'express';

import { emails } from '../../Controller/index';

const router = express.Router();

router.route('/verification').post(emails.sendVerificationEmail);
router.route('/news-letter').post(emails.sendNewsLetterEmail);
router.route('/reset-password').post(emails.sendResetPasswordEmail);
router.route('/order-status').post(emails.sendOrderStatusEmail);
router.route('/order').post(emails.sendOrderConfirmEmail);

export default router;
