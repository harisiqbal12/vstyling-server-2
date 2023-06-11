"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = __importDefault(require("./validation"));
const emails_1 = __importDefault(require("./emails"));
const actions_1 = __importDefault(require("./actions"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.route('/').get((_req, res) => {
    res.status(200).send('<h2>Vstyling Socket Server</h2>');
});
router.use('/validation', validation_1.default);
router.use('/email', emails_1.default);
router.use('/actions', actions_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
