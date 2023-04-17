import { Response, Request } from 'express';

import prisma from '../../prisma';
import { user } from '../../utils';

type Data = {
	token: string | null;
	success: boolean;
	error: boolean;
	message: string | null;
	name: string | null | undefined;
	email: string | null | undefined;
	expired: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.token) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/invalid-request',
			});

			err.name = 'Invalid Request';
			err.message = 'Email or password not define';
			throw err;
		}

		const { token } = req?.body;

		const response = await user.authenticate(token);

		const userDB = await prisma.users.findUnique({
			where: {
				email: response?.email || undefined,
			},

			select: {
				lock: true,
				status: true,
			},
		});

		if (userDB?.lock) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/user-disabled',
			});

			err.name = 'Prisma user account locked';
			err.message = 'User has been blocked by admin';
			throw err;
		}

		if (!userDB?.status) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/user-disabled',
			});

			err.name = 'Prisma user status disabled';
			err.message = 'User account has been disabled by admin';
			throw err;
		}

		res.status(200).json({
			success: true,
			name: response?.name,
			email: response?.email,
			error: false,
			token: token,
			message: null,
			expired: false,
		});
	} catch (err) {

		//@ts-ignore
		const code: string = err?.code;

		if (code === "auth/invalid-custom-token'") {
			res.status(400).json({
				success: false,
				error: true,
				//@ts-ignore
				message: 'invalid token',
				token: null,
				name: null,
				email: null,
				expired: false,
			});
			return;
		}
		if (code === 'auth/invalid-request') {
			res.status(400).json({
				success: false,
				error: true,
				//@ts-ignore
				message: 'Invalid request',
				token: null,
				name: null,
				email: null,
				expired: false,
			});

			return;
		}

		if (code === 'auth/id-token-expired') {
			console.log('token expired');
			res.status(400).json({
				success: false,
				error: true,
				//@ts-ignore
				message: 'Token expired',
				token: null,
				name: null,
				email: null,
				expired: true,
			});

			return;
		}

		res.status(500).json({
			success: false,
			error: true,
			message: 'Internal server error',
			token: null,
			name: null,
			email: null,
			expired: false,
		});
	} finally {
		prisma
			.$disconnect()
			.then(res => {
				console.log('prisma disconnected');
			})
			.catch(err => {
				console.log('error disconecting prisma');
			});
	}
}
