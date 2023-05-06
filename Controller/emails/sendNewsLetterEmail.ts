import { Request, Response } from 'express';

import { sendEmail } from '../../utils';


export default async function handler(req: Request, res: Response) {
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

		const result = await sendEmail.subscribeNewsLetter({ email });

		console.log(result);

		res.status(200).json({
			success: true,
			error: false,
		});
	} catch (err) {

		console.log(err)
		res.status(500).json({
			success: false,
			error: true,
			message: 'Internal server error',
		});
	}
}
