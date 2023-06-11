import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from './client-config';

const auth = getAuth(app);

export default async function handler(
	email: string,
	password: string
): Promise<string> {
	const res = await createUserWithEmailAndPassword(auth, email, password);
	const token = await res.user.getIdToken();

	return token;
}
