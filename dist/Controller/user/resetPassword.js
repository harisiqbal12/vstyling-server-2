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
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password) || !((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.oobCode)) {
                res.status(400).json({
                    success: true,
                    error: false,
                    reason: 'Email or password not found',
                });
                return;
            }
            const { email, password, oobCode, } = req === null || req === void 0 ? void 0 : req.body;
            if (admin.apps.length) {
                const result = yield prisma_1.default.auth.findFirst({
                    where: {
                        AND: [
                            {
                                oobCode,
                            },
                            {
                                applied: false,
                            },
                        ],
                    },
                });
                if (!(result === null || result === void 0 ? void 0 : result.id)) {
                    res.status(200).json({
                        success: false,
                        error: true,
                        reason: 'Invalid link or link expired',
                    });
                    return;
                }
                const createdDate = new Date(result.createdAt);
                const currentDate = new Date(Date.now());
                let diff = (createdDate.getTime() - currentDate.getTime()) / 1000;
                diff /= 60;
                if (Math.abs(Math.round(diff)) < 10) {
                    // update the auth
                }
                const user = yield admin.auth(admin.app()).getUserByEmail(email);
                yield admin.auth(admin.app()).updateUser(user.uid, {
                    password,
                });
                return;
            }
            admin.initializeApp({
                //@ts-ignore
                credential: admin.credential.cert(xplorecreations_json_1.default),
            });
        }
        catch (err) { }
    });
}
exports.default = handler;
// export default async function handler({
// 	email,
// 	password,
// }: {
// 	email: string;
// 	password: string;
// }) {
// 	if (admin.apps.length) {
// 		const user = await admin.auth(admin.app()).getUserByEmail(email);
// 		await admin.auth(admin.app()).updateUser(user.uid, {
// 			password,
// 		});
// 		return;
// 	}
// 	admin.initializeApp({
// 		//@ts-ignore
// 		credential: admin.credential.cert(serviceAccount),
// 	});
// 	const user = await admin.auth(admin.app()).getUserByEmail(email);
// 	await admin.auth(admin.app()).updateUser(user.uid, {
// 		password,
// 	});
// }
