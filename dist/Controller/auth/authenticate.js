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
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
function handler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.token);
            console.log('body');
            if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.token)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/invalid-request',
                });
                err.name = 'Invalid Request';
                err.message = 'Email or password not define';
                throw err;
            }
            const { token } = req === null || req === void 0 ? void 0 : req.body;
            const response = yield utils_1.user.authenticate(token);
            const userDB = yield prisma_1.default.users.findUnique({
                where: {
                    email: (response === null || response === void 0 ? void 0 : response.email) || undefined,
                },
                select: {
                    lock: true,
                    status: true,
                },
            });
            if (userDB === null || userDB === void 0 ? void 0 : userDB.lock) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/user-disabled',
                });
                err.name = 'Prisma user account locked';
                err.message = 'User has been blocked by admin';
                throw err;
            }
            if (!(userDB === null || userDB === void 0 ? void 0 : userDB.status)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/user-disabled',
                });
                err.name = 'Prisma user status disabled';
                err.message = 'User account has been disabled by admin';
                throw err;
            }
            res.status(200).json({
                success: true,
                name: response === null || response === void 0 ? void 0 : response.name,
                email: response === null || response === void 0 ? void 0 : response.email,
                error: false,
                token: token,
                message: null,
                expired: false,
            });
        }
        catch (err) {
            console.log(err);
            //@ts-ignore
            const code = err === null || err === void 0 ? void 0 : err.code;
            if (code === "auth/invalid-custom-token'") {
                res.status(400).json({
                    success: false,
                    error: true,
                    //@ts-ignore
                    message: 'invalid token',
                    token: null,
                    name: null,
                    email: null,
                    expired: false,
                });
                return;
            }
            if (code === 'auth/invalid-request') {
                res.status(400).json({
                    success: false,
                    error: true,
                    //@ts-ignore
                    message: 'Invalid request',
                    token: null,
                    name: null,
                    email: null,
                    expired: false,
                });
                return;
            }
            if (code === 'auth/id-token-expired') {
                res.status(400).json({
                    success: false,
                    error: true,
                    //@ts-ignore
                    message: 'Token expired',
                    token: null,
                    name: null,
                    email: null,
                    expired: true,
                });
                return;
            }
            res.status(500).json({
                success: false,
                error: true,
                message: 'Internal server error',
                token: null,
                name: null,
                email: null,
                expired: false,
            });
        }
        finally {
            prisma_1.default
                .$disconnect()
                .then(res => {
                console.log('prisma disconnected');
            })
                .catch(err => {
                console.log('error disconecting prisma');
            });
        }
    });
}
exports.default = handler;
