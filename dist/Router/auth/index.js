"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../../Controller");
const router = express_1.default.Router();
router.route('/login').post(Controller_1.auth.login);
router.route('/authenticate').post(Controller_1.auth.authenticate);
exports.default = router;
