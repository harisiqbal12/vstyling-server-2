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
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/invalid-request',
                });
                err.name = 'Invalid Request';
                err.message = 'Please provide email';
                throw err;
            }
            if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/invalid-request',
                });
                err.name = 'Invalid Request';
                err.message = 'Please provide old password';
                throw err;
            }
            if (!((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.newPassword)) {
                let err = new Error();
                Object.assign(err, {
                    code: 'auth/invalid-request',
                });
                err.name = 'Invalid Request';
                err.message = 'Please provide new password';
                throw err;
            }
            const { email, password, newPassword } = req === null || req === void 0 ? void 0 : req.body;
            yield utils_1.user.changePassword(password, email, newPassword);
            res.status(200).json({ success: true, error: false, message: null });
        }
        catch (err) {
            console.log(err);
            //@ts-ignore
            if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-request') {
                res
                    .status(400)
                    //@ts-ignore
                    .json({ success: false, error: true, message: err === null || err === void 0 ? void 0 : err.message });
                return;
            }
            //@ts-ignore
            if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/wrong-password') {
                res
                    .status(401)
                    .json({ success: false, error: true, message: 'Invalid password' });
                return;
            }
            //@ts-ignore
            if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
                res
                    .status(400)
                    .json({ success: false, error: true, message: 'User not found' });
                return;
            }
            //@ts-ignore
            if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/too-many-requests') {
                res
                    .status(429)
                    .json({ success: false, error: true, message: 'too many requests' });
                return;
            }
            //@ts-ignore
            res.status(500).json({ success: false, error: true, message: err === null || err === void 0 ? void 0 : err.message });
        }
    });
}
exports.default = handler;
