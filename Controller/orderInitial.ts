import { Request, Response } from 'express';

import { sendEmail } from '../utils';

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function orderInitital(req: Request, res: Response<Data>) {
	try {
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
		if (!req?.body?.orderId) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide order id',
			});
			return;
		}

		if (!req?.body?.data) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide data',
			});
			return;
		}

		const { email, link, orderId, data } = req?.body;

		await sendEmail.orderInitial({ email, link, orderId, data });

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
