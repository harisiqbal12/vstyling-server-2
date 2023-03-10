"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../../Controller");
const router = express_1.default.Router();
router.route('/brand').post(Controller_1.validation.brand);
router.route('/footer').post(Controller_1.validation.footer);
router.route('/credit').post(Controller_1.validation.credit);
router.route('/category').post(Controller_1.validation.category);
router.route('/product').post(Controller_1.validation.product);
router.route('/variant').post(Controller_1.validation.variant);
exports.default = router;
