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
function handler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data)) {
                res
                    .status(400)
                    .json({ success: false, id: null, existed: null, error: true });
                prisma_1.default
                    .$disconnect()
                    .then(res => { })
                    .catch(err => { });
                return;
            }
            const response = yield prisma_1.default.credit.findMany({
                where: {
                    AND: [
                        {
                            user: {
                                email: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.data,
                            },
                        },
                        {
                            AND: [
                                {
                                    expired: false,
                                },
                                {
                                    expirationDate: {
                                        gt: new Date(Date.now()),
                                    },
                                },
                            ],
                        },
                    ],
                },
                select: {
                    id: true,
                },
            });
            if (!(response === null || response === void 0 ? void 0 : response.length)) {
                res
                    .status(200)
                    .json({ success: true, existed: false, id: null, error: false });
                return;
            }
            res
                .status(200)
                .json({ success: true, existed: true, id: response, error: false });
        }
        catch (err) {
            res
                .status(500)
                .json({ success: false, existed: false, id: null, error: true });
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
