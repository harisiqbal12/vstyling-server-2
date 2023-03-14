import { Request, Response } from 'express';

import { sendEmail } from '../../utils';

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

		if (!req?.body?.status) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide link',
			});
			return;
		}

		if (!req?.body?.orderId) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide order id',
			});
			return;
		}

		if (!req?.body?.name) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide customer name',
			});

			return;
		}

		console.log(req?.body)

		const { email, status, orderId, name } = req?.body;

		await sendEmail.orderStatus({ email, status, orderId, name });

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
