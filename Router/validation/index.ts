import express from 'express';
import { validation } from '../../Controller';

const router = express.Router();

router.route('/brand').post(validation.brand);
router.route('/footer').post(validation.footer);
router.route('/credit').post(validation.credit);
router.route('/category').post(validation.category);
router.route('/product').post(validation.product);
router.route('/variant').post(validation.variant);

export default router;
