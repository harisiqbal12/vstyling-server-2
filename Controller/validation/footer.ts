import { Response, Request } from 'express';

import prisma from '../../prisma';

type Data = {
	success: boolean;
	existed: boolean | null;
	error: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.data) {
			res.status(400).json({ success: false, existed: null, error: true });
			return;
		}

		if (req?.body?.id) {
			const response = await prisma.footer.findFirst({
				where: {
					slug: req?.body?.data,
					NOT: {
						id: req?.body?.id,
					},
				},

				select: {
					id: true,
				},
			});

			if (response?.id) {
				res.status(200).json({ success: true, existed: true, error: false });
				return;
			}

			res.status(200).json({ success: true, existed: false, error: false });
			return;
		}

		const response = await prisma.footer.findUnique({
			where: {
				slug: req?.body?.data,
			},

			select: {
				id: true,
			},
		});

		if (response?.id) {
			res.status(200).json({ success: true, existed: true, error: false });
			return;
		}

		res.status(200).json({ success: true, existed: false, error: false });
	} catch (err) {
		res.status(500).json({ success: false, existed: null, error: true });
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
