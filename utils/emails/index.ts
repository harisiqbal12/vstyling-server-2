import nodemailer from 'nodemailer';
import Template from '../templates';

class SendMail {
	transporter: nodemailer.Transporter<any> | null = null;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'services.xplorecreations.com',
			port: 465,
			secure: true,
			auth: {
				user: 'no-reply@services.xplorecreations.com',
				pass: 'R,Gu&5IWmtHg',
			},
		});
	}

	sendVerificationEmail({ email }: { email: string }) {
		return new Promise((resolve, reject) => {
			this.transporter
				?.sendMail({
					from: "'Xplorecreations' <no-reply@services.xplorecreations.com>",
					to: email,
					subject: 'Welcome to Xplorecreation',
					html: Template.verificationTemplate(),
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
					from: "'Xplorecreations' <no-reply@services.xplorecreations.com>",
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

	resetPassword({ email }: { email: string; link: string }) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Xplorecreations' <no-reply@services.xplorecreations.com>",
					to: email,
					subject: 'Reset password',
					html: Template.resetPassword(),
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
	}: {
		email: string;
		status: string;
		orderId: string;
	}) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Xplorecreations' <no-reply@services.xplorecreations.com>",
					to: email,
					subject: 'Order status updated',
					html: Template.orderStatus(),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	orderInitial({email, link, orderId, data}: { email: string; link: string; orderId: string; data: any }) {
		return new Promise((resolve, reject) => {
			this?.transporter
				?.sendMail({
					from: "'Xplorecreations' <no-reply@services.xplorecreations.com>",
					to: email,
					subject: 'Order confirm',
					html: Template.orderConfirm(),
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
