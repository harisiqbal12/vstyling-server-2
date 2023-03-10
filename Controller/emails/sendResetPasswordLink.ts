import { Request, Response } from 'express';

import { sendEmail } from '../../utils';
import generateLink from '../../utils/users/generateResetPassword';
import prisma from '../../prisma';

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.email) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide email',
			});
			return;
		}

		const { email } = req?.body;

		const link = await generateLink(email);

		await sendEmail.resetPassword({ email, link });

		await prisma.auth.create({
			data: {
				email,
				mode: 'passwordReset',
				oobCode: link?.split('oobCode=')[1]?.split('&')[0],
			},
		});

		res.status(200).json({
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: true,
			message: 'Internal server error',
		});
	}
	prisma
		.$disconnect()
		.then(res => {
			console.log('disconnected');
		})
		.catch(err => {
			console.log('error at disconnected');
		});
}
