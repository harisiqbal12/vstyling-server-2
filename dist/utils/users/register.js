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
const auth_1 = require("firebase/auth");
const client_config_1 = require("./client-config");
const auth = (0, auth_1.getAuth)(client_config_1.app);
function handler(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
        const token = yield res.user.getIdToken();
        return token;
    });
}
exports.default = handler;
