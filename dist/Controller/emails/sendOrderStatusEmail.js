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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function handler(req, res) {
    var _a, _b, _c, _d;
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
            if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.status)) {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Provide link',
                });
                return;
            }
            if (!((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.orderId)) {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Provide order id',
                });
                return;
            }
            if (!((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.name)) {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Provide customer name',
                });
                return;
            }
            console.log(req === null || req === void 0 ? void 0 : req.body);
            const { email, status, orderId, name } = req === null || req === void 0 ? void 0 : req.body;
            yield utils_1.sendEmail.orderStatus({ email, status, orderId, name });
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
    });
}
exports.default = handler;
