import { Response, Request } from 'express';

import prisma from '../../prisma';

type Data = {
	success: boolean;
	id: Array<{ id: string }> | null;
	existed: boolean | null;
	error: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.data) {
			res
				.status(400)
				.json({ success: false, id: null, existed: null, error: true });
			prisma
				.$disconnect()
				.then(res => {})
				.catch(err => {});
			return;
		}

		const response = await prisma.credit.findMany({
			where: {
				AND: [
					{
						user: {
							email: req?.body?.data,
						},
					},
					{
						AND: [
							{
								expired: false,
							},
							{
								expirationDate: {
									gt: new Date(Date.now()),
								},
							},
						],
					},
				],
			},

			select: {
				id: true,
			},
		});

		if (!response?.length) {
			res
				.status(200)
				.json({ success: true, existed: false, id: null, error: false });

			return;
		}

		res
			.status(200)
			.json({ success: true, existed: true, id: response, error: false });
	} catch (err) {
		res
			.status(500)
			.json({ success: false, existed: false, id: null, error: true });
	} finally {
		prisma
			.$disconnect()
			.then(res => {
				console.log('disconnected');
			})
			.catch(err => {
				console.log('error at disconnected');
			});
	}
}
