import { Request, Response } from 'express';

import prisma from '../../prisma';

type Data = {
	success: boolean;
	isExisted: boolean | null;
	error: boolean;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		if (!req?.body?.data) {
			res.status(400).json({ success: false, isExisted: null, error: true });
			return;
		}

		const { data } = req.body;

		if (req?.body?.id) {
			const response = await prisma.categories.findFirst({
				where: {
					NOT: {
						id: req?.body?.id,
					},
					slug: data,
				},

				select: {
					id: true,
				},
			});

			if (!response?.id) {
				return res.status(200).json({
					success: true,
					isExisted: false,
					error: false,
				});
			}

			res.status(200).json({
				success: true,
				isExisted: true,
				error: false,
			});
			return;
		}

		const response = await prisma.categories.findFirst({
			where: {
				slug: data,
			},

			select: {
				id: true,
			},
		});

		if (!response?.id) {
			res.status(200).json({
				success: true,
				isExisted: false,
				error: false,
			});
			return;
		}

		res.status(200).json({
			success: true,
			isExisted: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			isExisted: null,
			error: true,
		});
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
