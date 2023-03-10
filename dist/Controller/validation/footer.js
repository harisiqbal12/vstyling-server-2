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
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data)) {
                res.status(400).json({ success: false, existed: null, error: true });
                return;
            }
            if ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id) {
                const response = yield prisma_1.default.footer.findFirst({
                    where: {
                        slug: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.data,
                        NOT: {
                            id: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.id,
                        },
                    },
                    select: {
                        id: true,
                    },
                });
                if (response === null || response === void 0 ? void 0 : response.id) {
                    res.status(200).json({ success: true, existed: true, error: false });
                    return;
                }
                res.status(200).json({ success: true, existed: false, error: false });
                return;
            }
            const response = yield prisma_1.default.footer.findUnique({
                where: {
                    slug: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.data,
                },
                select: {
                    id: true,
                },
            });
            if (response === null || response === void 0 ? void 0 : response.id) {
                res.status(200).json({ success: true, existed: true, error: false });
                return;
            }
            res.status(200).json({ success: true, existed: false, error: false });
        }
        catch (err) {
            res.status(500).json({ success: false, existed: null, error: true });
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
