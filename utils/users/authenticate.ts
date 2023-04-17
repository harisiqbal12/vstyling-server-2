import * as admin from 'firebase-admin';

import serviceAccount from '../../xplorecreations.json';

export default async function handler(token: string): Promise<{
	name: string | null;
	email: string | null;
}> {
	if (admin.apps.length) {
		const res = await admin.auth(admin.app()).verifyIdToken(token);

		return {
			name: res?.name,
			email: res?.email || null,
		};
	}

	admin.initializeApp({
		//@ts-ignore
		credential: admin.credential.cert(serviceAccount),
	});

	const res = await admin.auth(admin.app()).verifyIdToken(token);

	return {
		name: res?.name || null,
		email: res?.email || null,
	};
}
