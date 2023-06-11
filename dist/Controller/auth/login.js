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
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/invalid-request',
                });
                err.name = 'Invalid Request';
                err.message = 'Email or password not define';
                throw err;
            }
            const { email, password } = req === null || req === void 0 ? void 0 : req.body;
            const userDB = yield prisma_1.default.users.findUnique({
                where: {
                    email,
                },
                select: {
                    status: true,
                    lock: true,
                    name: true,
                },
            });
            if (!userDB) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/user-not-found',
                });
                err.name = 'Prisma not found user';
                err.message = 'User not found in database';
                throw err;
            }
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
            const token = yield utils_1.user.loginUser(email, password);
            res.status(200).json({
                success: true,
                token,
                email,
                name: userDB === null || userDB === void 0 ? void 0 : userDB.name,
                error: false,
                message: null,
            });
        }
        catch (err) {
            console.log(err);
            //@ts-ignore
            const code = err === null || err === void 0 ? void 0 : err.code;
            if (code === 'auth/invalid-request') {
                res.status(400).json({
                    success: false,
                    error: true,
                    //@ts-ignore
                    message: err === null || err === void 0 ? void 0 : err.message,
                    token: null,
                    name: null,
                    email: null,
                });
                return;
            }
            if (code === 'auth/invalid-email') {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'invalid email',
                    token: null,
                    name: null,
                    email: null,
                });
                return;
            }
            if (code === 'auth/user-not-found') {
                res.status(404).json({
                    success: false,
                    error: true,
                    message: 'user not found',
                    token: null,
                    name: null,
                    email: null,
                });
                return;
            }
            if (code === 'auth/wrong-password') {
                res.status(401).json({
                    success: false,
                    error: true,
                    message: 'wrong password',
                    token: null,
                    name: null,
                    email: null,
                });
                return;
            }
            if (code === 'auth/user-disabled') {
                res.status(401).json({
                    success: false,
                    error: true,
                    message: 'user disabled',
                    token: null,
                    name: null,
                    email: null,
                });
            }
            console.log(err);
            res.status(500).json({
                success: false,
                error: true,
                message: 'Internal server error',
                token: null,
                name: null,
                email: null,
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
