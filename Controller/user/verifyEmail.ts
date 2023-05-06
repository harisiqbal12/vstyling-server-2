import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import prisma from '../../prisma';
import serviceAccount from '../../service.json'

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.oobCode) {
			res
				.status(400)
				.json({ success: false, error: true, message: 'Oobcode not found' });
			return;
		}

		const { oobCode } = req?.body;

		const result = await prisma.auth.findUnique({
			where: {
				oobCode,
			},
		});

		if (!result) {
			res.status(200).json({
				success: false,
				error: true,
				message: 'Invalid oobcode, oobcode not found',
			});
			return;
		}

		if (result.applied === true) {
			res.status(200).json({
				success: false,
				error: true,
				message: 'Oobcode already applied',
			});

			return;
		}

		const createdDate = new Date(result.createdAt);
		const currentDate = new Date(Date.now());

		let diff = (createdDate.getTime() - currentDate.getTime()) / 1000;
		diff /= 60;

		if (Math.abs(Math.round(diff)) > 10) {
			res
				.status(200)
				.json({ success: false, error: true, message: 'Link expired' });
			return;
		}

		if (admin.apps.length) {
			const user = await admin.auth(admin.app()).getUserByEmail(result.email);

			await admin.auth(admin.app()).updateUser(user.uid, {
				emailVerified: true,
			});

			await prisma.users.update({
				where: {
					email: result?.email,
				},

				data: {
					emailverify: true,
				},
			});

			await prisma.auth.update({
				where: {
					oobCode,
				},
				data: {
					applied: true,
				},
			});

			res.status(200).json({ success: true, error: false });
			return;
		}

		admin.initializeApp({
			//@ts-ignore
			credential: admin.credential.cert(serviceAccount),
		});

		const user = await admin.auth(admin.app()).getUserByEmail(result.email);

		await admin.auth(admin.app()).updateUser(user.uid, {
			emailVerified: true,
		});

		await prisma.auth.update({
			where: {
				oobCode,
			},
			data: {
				applied: true,
			},
		});

		await prisma.users.update({
			where: {
				email: result?.email,
			},

			data: {
				emailverify: true,
			},
		});

		res.status(200).json({ success: true, error: false });
	} catch (err) {
		res.status(500).json({
			success: false,
			error: true,
			message: 'Internal server error',
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
