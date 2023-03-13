import express from 'express';

import validation from './validation';
import email from './emails';
import actions from './actions';

const router = express.Router();

router.route('/').get((_req, res) => {
	res.status(200).send('<h2>Explore Creation Socket Server</h2>');
});

router.use('/validation', validation);
router.use('/email', email);
router.use('/actions', actions);

export default router;
