import { Request, Response } from 'express';

import { sendEmail } from '../../utils';
import prisma from '../../prisma';

type Data = {
	success: boolean;
	error: boolean;
	message?: string;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.orderId) {
			res.status(400).json({
				success: false,
				error: true,
				message: 'Provide order id',
			});
			return;
		}

		const { email, data, total, subtotal } = req?.body;

		await sendEmail.orderInitial({ email, data, total, subtotal });

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
