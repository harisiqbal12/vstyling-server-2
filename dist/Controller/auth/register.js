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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            validateBody(req.body);
            const { name, email, password, driverLicense, businessLicense, companyName, salesTaxPermit, Dba, businessAddress, einNumber, shippingAddress, number, } = req.body;
            const createdUser = yield prisma_1.default.users.create({
                data: {
                    name,
                    email,
                    number,
                },
                select: {
                    id: true,
                },
            });
            yield prisma_1.default.businessDetails.create({
                data: {
                    driverLicense,
                    businessLicense,
                    companyName,
                    salesTaxPermit,
                    Dba,
                    businessAddress,
                    einNumber,
                    shippingAddress,
                    user: {
                        connect: {
                            id: createdUser === null || createdUser === void 0 ? void 0 : createdUser.id,
                        },
                    },
                },
            });
            const token = yield utils_1.user.registerFirebase(email, password);
            res.status(200).json({
                success: true,
                error: true,
                message: null,
                token: token,
                name: null,
                email: null,
                fieldName: null,
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
                    fieldName: err === null || err === void 0 ? void 0 : err.field,
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
                    fieldName: 'email',
                });
                return;
            }
            res.status(500).json({
                success: false,
                error: true,
                message: null,
                token: null,
                name: null,
                email: null,
                fieldName: null,
            });
        }
        finally {
            prisma_1.default
                .$disconnect()
                .then(_ => {
                console.log('prisma disconnected');
            })
                .catch(_ => {
                console.log('error disconecting prisma');
            });
        }
    });
}
exports.default = handler;
function validateBody(body) {
    let err = new Error();
    if (!(body === null || body === void 0 ? void 0 : body.name)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        err.name = 'Invalid Request';
        err.message = 'Name not define';
        Object.assign(err, {
            field: 'name',
        });
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.email)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        err.name = 'Invalid Request';
        err.message = 'Email not define';
        Object.assign(err, {
            field: 'email',
        });
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.number)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        err.name = 'Invalid Request';
        err.message = 'Number not define';
        Object.assign(err, {
            field: 'number',
        });
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.password)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'password',
        });
        err.name = 'Invalid Request';
        err.message = 'Password not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.driverLicense)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'driverLicense',
        });
        err.name = 'Invalid Request';
        err.message = 'Driver License not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.businessLicense)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'businessLicense',
        });
        err.name = 'Invalid Request';
        err.message = 'Business License not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.companyName)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'companyName',
        });
        err.name = 'Invalid Request';
        err.message = 'Company Name not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.salesTaxPermit)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'salesTaxPermit',
        });
        err.name = 'Invalid Request';
        err.message = 'Sales Tax Permit not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.Dba)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'Dba',
        });
        err.name = 'Invalid Request';
        err.message = 'DBA not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.businessAddress)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'businessAddress',
        });
        err.name = 'Invalid Request';
        err.message = 'Business address not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.einNumber)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'einNumber',
        });
        err.name = 'Invalid Request';
        err.message = 'Ein number not define';
        throw err;
    }
    if (!(body === null || body === void 0 ? void 0 : body.shippingAddress)) {
        Object.assign(err, {
            code: 'auth/invalid-request',
        });
        Object.assign(err, {
            field: 'shippingAddress',
        });
        err.name = 'Invalid Request';
        err.message = 'Shipping address  not define';
        throw err;
    }
}
