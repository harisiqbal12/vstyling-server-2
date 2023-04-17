import {
	signInWithEmailAndPassword,
	getAuth,
	updatePassword,
} from 'firebase/auth';
import { app } from './client-config';

const auth = getAuth(app);

export default async function handler(
	password: string,
	email: string,
	newPassword: string
): Promise<void> {
	const user = await signInWithEmailAndPassword(auth, email, password);

	await updatePassword(user.user, newPassword);
}
