"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../Controller/index");
const router = express_1.default.Router();
router.route('/verification').post(index_1.emails.sendVerificationEmail);
router.route('/news-letter').post(index_1.emails.sendNewsLetterEmail);
router.route('/reset-password').post(index_1.emails.sendResetPasswordEmail);
router.route('/order-status').post(index_1.emails.sendOrderStatusEmail);
router.route('/order-confirm').post(index_1.emails.sendOrderConfirmEmail);
exports.default = router;
