import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import prisma from '../../prisma';

import serviceAccount from '../../service.json'

type Data = {
	success: boolean;
	error: boolean;
	reason: string | null;
	data?: string;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.password || !req?.body?.oobCode) {
			res.status(400).json({
				success: true,
				error: false,
				reason: 'Email or password or oobcode not found',
			});
			return;
		}

		const { password, oobCode }: { password: string; oobCode: string } =
			req?.body;

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

		if (Math.abs(Math.round(diff)) > 10) {
			res
				.status(200)
				.json({ success: false, error: true, reason: 'Link expired' });
			return;
		}

		if (admin.apps.length) {
			const user = await admin.auth(admin.app()).getUserByEmail(result?.email);

			await admin.auth(admin.app()).updateUser(user.uid, {
				password,
			});

			await prisma.auth.update({
				where: {
					oobCode,
				},
				data: {
					applied: true,
				},
			});

			res.status(200).json({ success: true, error: false, reason: null });

			return;
		}

		admin.initializeApp({
			//@ts-ignore
			credential: admin.credential.cert(serviceAccount),
		});

		const user = await admin.auth(admin.app()).getUserByEmail(result?.email);

		await admin.auth(admin.app()).updateUser(user.uid, {
			password,
		});

		await prisma.auth.update({
			where: {
				oobCode,
			},
			data: {
				applied: true,
			},
		});

		res.status(200).json({ success: true, error: false, reason: null });
		return;
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ success: false, error: true, reason: 'Internal server error' });
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
