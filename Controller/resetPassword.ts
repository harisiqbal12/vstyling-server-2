import { Request, Response } from 'express';

import { sendEmail } from '../utils';

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function resetPasssword(req: Request, res: Response<Data>) {
	try {
		console.log(req?.body);
		if (!req?.body?.email) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide email',
			});
			return;
		}

		if (!req?.body?.link) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide link',
			});
			return;
		}

		const { email, link } = req?.body;

		await sendEmail.resetPassword({ email, link });

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
}
