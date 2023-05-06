import nodemailer from 'nodemailer';
import Template from '../templates';

class SendMail {
	transporter: nodemailer.Transporter<any> | null = null;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'yahoo',
			auth: {
				user: 'virtualstyling@yahoo.com',
				pass: '2pD-!s4E7FBwpie',
			},
		});
	}

	sendVerificationEmail({ email, link }: { email: string; link: string }) {
		return new Promise((resolve, reject) => {
			this.transporter
				?.sendMail({
					from: "'Vstyling' <virtualstyling@yahoo.com>",
					to: email,
					subject: 'Welcome to Vstyling',
					html: Template.verificationTemplate({ link }),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	subscribeNewsLetter({ email }: { email: string }) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Vstyling' <virtualstyling@yahoo.com>",
					to: email,
					subject: 'Newsletter',
					html: Template.newsLetter(),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	resetPassword({ email, link }: { email: string; link: string }) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Vstyling' <virtualstyling@yahoo.com>",
					to: email,
					subject: 'Reset password',
					html: Template.resetPassword({ link }),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	orderStatus({
		email,
		status,
		orderId,
		name,
	}: {
		email: string;
		status: string;
		orderId: string;
		name: string;
	}) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Vstyling' <virtualstyling@yahoo.com>",
					to: email,
					subject: 'Order status updated',
					html: Template.orderStatus({ status, id: orderId, name }),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	orderInitial({
		email,
		data,
		total,
		subtotal,
	}: {
		email: string;
		data: Array<{
			quantity: number;
			name: string;
			imageURI: string;
			sku: string;
			price: number;
		}>;
		total: string;
		subtotal: string;
	}) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Vstyling' <virtualstyling@yahoo.com>",
					to: email,
					subject: 'Order confirm',
					html: Template.orderConfirm({ data, total, subtotal }),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}

export default new SendMail();
