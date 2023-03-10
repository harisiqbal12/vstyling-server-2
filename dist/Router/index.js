"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.email = void 0;
var emails_1 = require("./emails");
Object.defineProperty(exports, "email", { enumerable: true, get: function () { return __importDefault(emails_1).default; } });
var validation_1 = require("./validation");
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return __importDefault(validation_1).default; } });
