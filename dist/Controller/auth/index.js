"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.changePassword = exports.authenticate = exports.login = void 0;
var login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var authenticate_1 = require("./authenticate");
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return __importDefault(authenticate_1).default; } });
var changePassword_1 = require("./changePassword");
Object.defineProperty(exports, "changePassword", { enumerable: true, get: function () { return __importDefault(changePassword_1).default; } });
var register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
