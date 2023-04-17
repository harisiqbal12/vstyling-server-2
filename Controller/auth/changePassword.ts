import { Response, Request } from 'express';

import { user } from '../../utils';

type Data = {
	success: boolean;
	error: boolean;
	message: string | null;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.email) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/invalid-request',
			});

			err.name = 'Invalid Request';
			err.message = 'Please provide email';
			throw err;
		}

		if (!req?.body?.password) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/invalid-request',
			});

			err.name = 'Invalid Request';
			err.message = 'Please provide old password';
			throw err;
		}
		if (!req?.body?.newPassword) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/invalid-request',
			});

			err.name = 'Invalid Request';
			err.message = 'Please provide new password';
			throw err;
		}

		const { email, password, newPassword } = req?.body;
		await user.changePassword(password, email, newPassword);

		res.status(200).json({ success: true, error: false, message: null });
	} catch (err) {
		console.log(err);

		//@ts-ignore
		if (err?.code === 'auth/invalid-request') {
			res
				.status(400)
				//@ts-ignore
				.json({ success: false, error: true, message: err?.message });

			return;
		}

		//@ts-ignore
		if (err?.code === 'auth/wrong-password') {
			res
				.status(401)
				.json({ success: false, error: true, message: 'Invalid password' });

			return;
		}

		//@ts-ignore
		if (err?.code === 'auth/user-not-found') {
			res
				.status(400)
				.json({ success: false, error: true, message: 'User not found' });

			return;
		}

		//@ts-ignore
		if (err?.code === 'auth/too-many-requests') {
			res
				.status(429)
				.json({ success: false, error: true, message: 'too many requests' });
			return;
		}

		//@ts-ignore
		res.status(500).json({ success: false, error: true, message: err?.message });
	}
}
