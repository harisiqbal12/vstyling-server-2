import { Request, Response } from 'express';

import { sendEmail } from '../utils';

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function orderStatus(req: Request, res: Response<Data>) {
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

		const { email, status, orderId } = req?.body;

		await sendEmail.orderStatus({ email, status, orderId });

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
