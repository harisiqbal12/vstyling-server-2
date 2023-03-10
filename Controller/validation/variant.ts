import { Response, Request } from 'express';

import prisma from '../../prisma';

type Data = {
	success: boolean;
	existed: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.data) {
			res.status(400).json({ success: false, existed: false });
			return;
		}

		const response = await prisma.variant.findFirst({
			where: {
				sku: req?.body?.data,
			},

			select: {
				id: true,
			},
		});

		if (!response?.id) {
			res.status(200).json({ success: true, existed: false });
			return;
		}

		res.status(200).json({ success: true, existed: true });
	} catch (err) {
		res.status(500).json({ success: false, existed: false });
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
