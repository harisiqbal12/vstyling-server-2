"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const admin = __importStar(require("firebase-admin"));
const prisma_1 = __importDefault(require("../../prisma"));
const xplorecreations_json_1 = __importDefault(require("../../xplorecreations.json"));
function handler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.oobCode)) {
                res
                    .status(400)
                    .json({ success: false, error: true, message: 'Oobcode not found' });
                return;
            }
            const { oobCode } = req === null || req === void 0 ? void 0 : req.body;
            const result = yield prisma_1.default.auth.findUnique({
                where: {
                    oobCode,
                },
            });
            if (!result) {
                res.status(200).json({
                    success: false,
                    error: true,
                    message: 'Invalid oobcode, oobcode not found',
                });
                return;
            }
            if (result.applied === true) {
                res.status(200).json({
                    success: false,
                    error: true,
                    message: 'Oobcode already applied',
                });
                return;
            }
            const createdDate = new Date(result.createdAt);
            const currentDate = new Date(Date.now());
            let diff = (createdDate.getTime() - currentDate.getTime()) / 1000;
            diff /= 60;
            if (Math.abs(Math.round(diff)) > 10) {
                res
                    .status(200)
                    .json({ success: false, error: true, message: 'Link expired' });
                return;
            }
            if (admin.apps.length) {
                const user = yield admin.auth(admin.app()).getUserByEmail(result.email);
                yield admin.auth(admin.app()).updateUser(user.uid, {
                    emailVerified: true,
                });
                yield prisma_1.default.users.update({
                    where: {
                        email: result === null || result === void 0 ? void 0 : result.email,
                    },
                    data: {
                        emailverify: true,
                    },
                });
                yield prisma_1.default.auth.update({
                    where: {
                        oobCode,
                    },
                    data: {
                        applied: true,
                    },
                });
                res.status(200).json({ success: true, error: false });
                return;
            }
            admin.initializeApp({
                //@ts-ignore
                credential: admin.credential.cert(xplorecreations_json_1.default),
            });
            const user = yield admin.auth(admin.app()).getUserByEmail(result.email);
            yield admin.auth(admin.app()).updateUser(user.uid, {
                emailVerified: true,
            });
            yield prisma_1.default.auth.update({
                where: {
                    oobCode,
                },
                data: {
                    applied: true,
                },
            });
            yield prisma_1.default.users.update({
                where: {
                    email: result === null || result === void 0 ? void 0 : result.email,
                },
                data: {
                    emailverify: true,
                },
            });
            res.status(200).json({ success: true, error: false });
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
                console.log('prisma disconnected');
            })
                .catch(err => {
                console.log('error disconecting prisma');
            });
        }
    });
}
exports.default = handler;
