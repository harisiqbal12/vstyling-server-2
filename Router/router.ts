import express from 'express';

import validation from './validation';
import email from './emails';

const router = express.Router();

router.route('/').get((_req, res) => {
	res.status(200).send('<h2>Explore Creation Socket Server</h2>');
});

router.use('/validation', validation);
router.use('/email', email);

export default router;
