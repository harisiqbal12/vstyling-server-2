import { Response, Request } from 'express';

import prisma from '../../prisma';

type Data = {
	success: boolean;
	field: string | null;
	message: string | null;
	error: string | null;
	exist: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.field || !req?.body?.data) {
			res.status(400).json({
				success: false,
				field: null,
				message: null,
				error: 'missing fields from the body',
				exist: false,
			});

			return;
		}

		const { field, data }: { field: string; data: string } = req?.body;

		if (req?.body?.id) {
			const response = await prisma.products.findFirst({
				where: {
					[field]: data,
					NOT: {
						id: req?.body?.id,
					},
				},
			});

			if (!response?.id) {
				res.status(200).json({
					success: true,
					field: null,
					message: null,
					error: null,
					exist: false,
				});

				return;
			}

			res.status(200).json({
				success: false,
				field: field,
				message: `${field} already exist.`,
				error: null,
				exist: true,
			});

			return;
		}

		const response = await prisma.products.findFirst({
			where: {
				[field]: data,
			},

			select: {
				id: true,
			},
		});

		if (!response?.id) {
			res.status(200).json({
				success: true,
				field: null,
				message: null,
				error: null,
				exist: false,
			});

			return;
		}

		res.status(200).json({
			success: false,
			field: field,
			message: `${field} already exist.`,
			error: null,
			exist: true,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			field: null,
			message: null,
			error: null,
			exist: false,
		});
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
