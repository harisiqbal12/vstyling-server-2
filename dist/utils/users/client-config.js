"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: 'AIzaSyAdCwvsklsz00kuPktoFvD-oXCBQKOCCdM',
    authDomain: 'xplorecreations-88ad0.firebaseapp.com',
    projectId: 'xplorecreations-88ad0',
    storageBucket: 'xplorecreations-88ad0.appspot.com',
    messagingSenderId: '760384044360',
    appId: '1:760384044360:web:e86465e1fd75e94e5a477d',
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
