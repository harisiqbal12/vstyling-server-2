import express from 'express';

import { emails } from '../../Controller/index';

const router = express.Router();

router.route('/verificationEmail').post(emails.sendVerificationEmail);
router.route('/news-letter').post(emails.newsLetterEmail);
router.route('/reset-password').post(emails.resetPassword);
router.route('/order-status').post(emails.orderStatus);
router.route('/order').post(emails.orderInitial);

export default router;
