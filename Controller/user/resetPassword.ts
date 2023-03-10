import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import prisma from '../../prisma';

import serviceAccount from '../../xplorecreations.json';

type Data = {
	success: boolean;
	error: boolean;
	reason: string;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.email || !req?.body?.password || !req?.body?.oobCode) {
			res.status(400).json({
				success: true,
				error: false,
				reason: 'Email or password not found',
			});
			return;
		}

		const {
			email,
			password,
			oobCode,
		}: { email: string; password: string; oobCode: string } = req?.body;

		if (admin.apps.length) {
			const result = await prisma.auth.findFirst({
				where: {
					AND: [
						{
							oobCode,
						},
						{
							applied: false,
						},
					],
				},
			});

			if (!result?.id) {
				res.status(200).json({
					success: false,
					error: true,
					reason: 'Invalid link or link expired',
				});
				return;
			}

			const createdDate = new Date(result.createdAt);
			const currentDate = new Date(Date.now());

			let diff = (createdDate.getTime() - currentDate.getTime()) / 1000;
			diff /= 60;
			if (Math.abs(Math.round(diff)) < 10) {
				// update the auth
			}

			const user = await admin.auth(admin.app()).getUserByEmail(email);
			await admin.auth(admin.app()).updateUser(user.uid, {
				password,
			});

			return;
		}

		admin.initializeApp({
			//@ts-ignore
			credential: admin.credential.cert(serviceAccount),
		});
	} catch (err) {}
}

// export default async function handler({
// 	email,
// 	password,
// }: {
// 	email: string;
// 	password: string;
// }) {
// 	if (admin.apps.length) {
// 		const user = await admin.auth(admin.app()).getUserByEmail(email);

// 		await admin.auth(admin.app()).updateUser(user.uid, {
// 			password,
// 		});

// 		return;
// 	}

// 	admin.initializeApp({
// 		//@ts-ignore
// 		credential: admin.credential.cert(serviceAccount),
// 	});

// 	const user = await admin.auth(admin.app()).getUserByEmail(email);

// 	await admin.auth(admin.app()).updateUser(user.uid, {
// 		password,
// 	});
// }
