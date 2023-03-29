import { initializeApp, FirebaseApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAdCwvsklsz00kuPktoFvD-oXCBQKOCCdM',
	authDomain: 'xplorecreations-88ad0.firebaseapp.com',
	projectId: 'xplorecreations-88ad0',
	storageBucket: 'xplorecreations-88ad0.appspot.com',
	messagingSenderId: '760384044360',
	appId: '1:760384044360:web:e86465e1fd75e94e5a477d',
};

// Initialize Firebase

export const app: FirebaseApp = initializeApp(firebaseConfig);
