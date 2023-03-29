"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const generateResetPassword_1 = __importDefault(require("../../utils/users/generateResetPassword"));
const prisma_1 = __importDefault(require("../../prisma"));
function handler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email)) {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Provide email',
                });
                return;
            }
            const { email } = req === null || req === void 0 ? void 0 : req.body;
            const link = yield (0, generateResetPassword_1.default)(email);
            yield utils_1.sendEmail.resetPassword({ email, link });
            yield prisma_1.default.auth.create({
                data: {
                    email,
                    mode: 'passwordReset',
                    oobCode: (_b = link === null || link === void 0 ? void 0 : link.split('oobCode=')[1]) === null || _b === void 0 ? void 0 : _b.split('&')[0],
                },
            });
            res.status(200).json({
                success: true,
                error: false,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                error: true,
                message: 'Internal server error',
            });
        }
        finally {
            prisma_1.default
                .$disconnect()
                .then(res => {
                console.log('disconnected');
            })
                .catch(err => {
                console.log('error at disconnected');
            });
        }
    });
}
exports.default = handler;
