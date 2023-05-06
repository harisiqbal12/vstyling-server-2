"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: 'AIzaSyDIuWgltGGysCzN1ggYSPICUjxs0BhvJYc',
    authDomain: 'vstyling-bfbb1.firebaseapp.com',
    projectId: 'vstyling-bfbb1',
    storageBucket: 'vstyling-bfbb1.appspot.com',
    messagingSenderId: '270677792987',
    appId: '1:270677792987:web:8d75329e92cfacb07494fe',
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
