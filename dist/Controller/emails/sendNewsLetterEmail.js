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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req === null || req === void 0 ? void 0 : req.body);
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email)) {
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Provide email',
                });
                return;
            }
            const { email } = req === null || req === void 0 ? void 0 : req.body;
            const result = yield utils_1.sendEmail.subscribeNewsLetter({ email });
            console.log(result);
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
