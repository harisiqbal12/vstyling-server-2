"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variant = exports.product = exports.category = exports.credit = exports.footer = exports.brand = void 0;
var brand_1 = require("./brand");
Object.defineProperty(exports, "brand", { enumerable: true, get: function () { return __importDefault(brand_1).default; } });
var footer_1 = require("./footer");
Object.defineProperty(exports, "footer", { enumerable: true, get: function () { return __importDefault(footer_1).default; } });
var credits_1 = require("./credits");
Object.defineProperty(exports, "credit", { enumerable: true, get: function () { return __importDefault(credits_1).default; } });
var category_1 = require("./category");
Object.defineProperty(exports, "category", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
var product_1 = require("./product");
Object.defineProperty(exports, "product", { enumerable: true, get: function () { return __importDefault(product_1).default; } });
var variant_1 = require("./variant");
Object.defineProperty(exports, "variant", { enumerable: true, get: function () { return __importDefault(variant_1).default; } });
