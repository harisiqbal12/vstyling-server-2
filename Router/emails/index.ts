import express from 'express';

import {
	sendVerificationEmail,
	newsLetterEmail,
	resetPassword,
	orderStatus,
	orderInitial,
} from '../../Controller/index';

const router = express.Router();

router.route('/verificationEmail').post(sendVerificationEmail);
router.route('/news-letter').post(newsLetterEmail);
router.route('/reset-password').post(resetPassword);
router.route('/order-status').post(orderStatus);
router.route('/order').post(orderInitial);

export default router;
