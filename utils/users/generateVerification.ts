import * as admin from 'firebase-admin';
import serviceAccount from '../../xplorecreations.json';

export default async function handler(email: string): Promise<string> {
	if (admin.apps.length) {
		const link = await admin
			.auth(admin.app())
			.generateEmailVerificationLink(email);

		return link;
	}

	admin.initializeApp({
		//@ts-ignore
		credential: admin.credential.cert(serviceAccount),
	});

	const link = await admin.auth(admin.app()).generateEmailVerificationLink(email);
	return link;
}
