import * as admin from 'firebase-admin';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import serviceAccount from '../../xplorecreations.json';
import { app } from './client-config';

const auth = getAuth(app);

const claims = {
	admin: true,
};

export default async function handler(
	email: string,
	password: string
): Promise<string> {
	console.log('im here login in user');
	if (admin.apps.length) {
		const res = await signInWithEmailAndPassword(auth, email, password);

		const token = await res.user.getIdToken();

		return token;
	}

	admin.initializeApp({
		//@ts-ignore
		credential: admin.credential.cert(serviceAccount),
	});

	const res = await signInWithEmailAndPassword(auth, email, password);

	const token = await res.user.getIdToken();

	return token;
}
