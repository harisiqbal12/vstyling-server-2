import express from 'express';

import { auth } from '../../Controller';

const router = express.Router();

router.route('/login').post(auth.login);
router.route('/authenticate').post(auth.authenticate);
router.route('/updatePassword').post(auth.changePassword);

export default router;
