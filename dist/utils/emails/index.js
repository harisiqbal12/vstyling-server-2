"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const templates_1 = __importDefault(require("../templates"));
class SendMail {
    constructor() {
        this.transporter = null;
        this.transporter = nodemailer_1.default.createTransport({
            service: 'yahoo',
            auth: {
                user: 'virtualstyling@yahoo.com',
                pass: '2pD-!s4E7FBwpie',
            },
        });
    }
    sendVerificationEmail({ email, link }) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this.transporter) === null || _a === void 0 ? void 0 : _a.sendMail({
                from: "'Vstyling' <virtualstyling@yahoo.com>",
                to: email,
                subject: 'Welcome to Vstyling',
                html: templates_1.default.verificationTemplate({ link }),
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    subscribeNewsLetter({ email }) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this === null || this === void 0 ? void 0 : this.transporter) === null || _a === void 0 ? void 0 : _a.sendMail({
                from: "'Vstyling' <virtualstyling@yahoo.com>",
                to: email,
                subject: 'Newsletter',
                html: templates_1.default.newsLetter(),
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    resetPassword({ email, link }) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this === null || this === void 0 ? void 0 : this.transporter) === null || _a === void 0 ? void 0 : _a.sendMail({
                from: "'Vstyling' <virtualstyling@yahoo.com>",
                to: email,
                subject: 'Reset password',
                html: templates_1.default.resetPassword({ link }),
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    orderStatus({ email, status, orderId, name, }) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this === null || this === void 0 ? void 0 : this.transporter) === null || _a === void 0 ? void 0 : _a.sendMail({
                from: "'Vstyling' <virtualstyling@yahoo.com>",
                to: email,
                subject: 'Order status updated',
                html: templates_1.default.orderStatus({ status, id: orderId, name }),
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    orderInitial({ email, data, total, subtotal, }) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this === null || this === void 0 ? void 0 : this.transporter) === null || _a === void 0 ? void 0 : _a.sendMail({
                from: "'Vstyling' <virtualstyling@yahoo.com>",
                to: email,
                subject: 'Order confirm',
                html: templates_1.default.orderConfirm({ data, total, subtotal }),
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = new SendMail();
