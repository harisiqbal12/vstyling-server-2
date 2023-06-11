import { Response, Request } from 'express';

import prisma from '../../prisma';
import { user } from '../../utils';

type Data = {
	token: string | null;
	success: boolean;
	error: boolean;
	message: string | null;
	name: string | null;
	email: string | null;
	fieldName: string | null;
};

export default async function handler(req: Request, res: Response<Data>) {
	try {
		validateBody(req.body);

		const {
			name,
			email,
			password,
			driverLicense,
			businessLicense,
			companyName,
			salesTaxPermit,
			Dba,
			businessAddress,
			einNumber,
			shippingAddress,
			number,
		} = req.body;

		const createdUser = await prisma.users.create({
			data: {
				name,
				email,
				number,
			},

			select: {
				id: true,
			},
		});

		await prisma.businessDetails.create({
			data: {
				driverLicense,
				businessLicense,
				companyName,
				salesTaxPermit,
				Dba,
				businessAddress,
				einNumber,
				shippingAddress,
				user: {
					connect: {
						id: createdUser?.id,
					},
				},
			},
		});

		const token = await user.registerFirebase(email, password);

		res.status(200).json({
			success: true,
			error: true,
			message: null,
			token: token,
			name: null,
			email: null,
			fieldName: null,
		});
	} catch (err: any) {
		console.log(err);

		//@ts-ignore
		const code: string = err?.code;

		if (code === 'auth/invalid-request') {
			res.status(400).json({
				success: false,
				error: true,
				//@ts-ignore
				message: err?.message,
				token: null,
				name: null,
				email: null,
				fieldName: err?.field,
			});
			return;
		}

		if (code === 'auth/invalid-email') {
			res.status(400).json({
				success: false,
				error: true,
				message: 'invalid email',
				token: null,
				name: null,
				email: null,
				fieldName: 'email',
			});
			return;
		}

		res.status(500).json({
			success: false,
			error: true,
			message: null,
			token: null,
			name: null,
			email: null,
			fieldName: null,
		});
	} finally {
		prisma
			.$disconnect()
			.then(_ => {
				console.log('prisma disconnected');
			})
			.catch(_ => {
				console.log('error disconecting prisma');
			});
	}
}

function validateBody(body: any) {
	let err = new Error();

	if (!body?.name) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		err.name = 'Invalid Request';
		err.message = 'Name not define';
		Object.assign(err, {
			field: 'name',
		});

		throw err;
	}

	if (!body?.email) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		err.name = 'Invalid Request';
		err.message = 'Email not define';

		Object.assign(err, {
			field: 'email',
		});

		throw err;
	}

	if(!body?.number) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		err.name = 'Invalid Request';
		err.message = 'Number not define';

		Object.assign(err, {
			field: 'number',
		});

		throw err;
	}

	if (!body?.password) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'password',
		});

		err.name = 'Invalid Request';
		err.message = 'Password not define';
		throw err;
	}

	if (!body?.driverLicense) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'driverLicense',
		});

		err.name = 'Invalid Request';
		err.message = 'Driver License not define';

		throw err;
	}

	if (!body?.businessLicense) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'businessLicense',
		});

		err.name = 'Invalid Request';
		err.message = 'Business License not define';
		throw err;
	}

	if (!body?.companyName) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'companyName',
		});

		err.name = 'Invalid Request';
		err.message = 'Company Name not define';
		throw err;
	}

	if (!body?.salesTaxPermit) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'salesTaxPermit',
		});

		err.name = 'Invalid Request';
		err.message = 'Sales Tax Permit not define';
		throw err;
	}

	if (!body?.Dba) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'Dba',
		});

		err.name = 'Invalid Request';
		err.message = 'DBA not define';
		throw err;
	}

	if (!body?.businessAddress) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'businessAddress',
		});

		err.name = 'Invalid Request';
		err.message = 'Business address not define';
		throw err;
	}

	if (!body?.einNumber) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'einNumber',
		});

		err.name = 'Invalid Request';
		err.message = 'Ein number not define';
		throw err;
	}

	if (!body?.shippingAddress) {
		Object.assign(err, {
			code: 'auth/invalid-request',
		});

		Object.assign(err, {
			field: 'shippingAddress',
		});

		err.name = 'Invalid Request';
		err.message = 'Shipping address  not define';
		throw err;
	}
}
