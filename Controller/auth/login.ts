import { Response, Request } from 'express';

import prisma from '../../prisma';
import { user } from '../../utils';

type Data = {
	token: string | null;
	success: boolean;
	error: boolean;
	message: string | null;
	name: string | null;
	email: string | null;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.email || !req?.body?.password) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/invalid-request',
			});

			err.name = 'Invalid Request';
			err.message = 'Email or password not define';
			throw err;
		}

		const { email, password } = req?.body;

		const userDB = await prisma.users.findUnique({
			where: {
				email,
			},

			select: {
				status: true,
				lock: true,
				name: true,
			},
		});

		if (!userDB) {
			let err = new Error();
			Object.assign(err, {
				code: 'auth/user-not-found',
			});

			err.name = 'Prisma not found user';
			err.message = 'User not found in database';
			throw err;
		}

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

		const token = await user.loginUser(email, password);

		res.status(200).json({
			success: true,
			token,
			email,
			name: userDB?.name,
			error: false,
			message: null,
		});
	} catch (err) {
		//@ts-ignore
		const code: string = err?.code;

		if (code === 'auth/invalid-request') {
			res.status(400).json({
				success: false,
				error: true,
				//@ts-ignore
				message: err?.message,
				token: null,
				name: null,
				email: null,
			});
			return;
		}

		if (code === 'auth/invalid-email') {
			res.status(400).json({
				success: false,
				error: true,
				message: 'invalid email',
				token: null,
				name: null,
				email: null,
			});
			return;
		}

		if (code === 'auth/user-not-found') {
			res.status(404).json({
				success: false,
				error: true,
				message: 'user not found',
				token: null,
				name: null,
				email: null,
			});

			return;
		}

		if (code === 'auth/wrong-password') {
			res.status(401).json({
				success: false,
				error: true,
				message: 'wrong password',
				token: null,
				name: null,
				email: null,
			});

			return;
		}

		if (code === 'auth/user-disabled') {
			res.status(401).json({
				success: false,
				error: true,
				message: 'user disabled',
				token: null,
				name: null,
				email: null,
			});
		}

		console.log(err);
		res.status(500).json({
			success: false,
			error: true,
			message: 'Internal server error',
			token: null,
			name: null,
			email: null,
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
