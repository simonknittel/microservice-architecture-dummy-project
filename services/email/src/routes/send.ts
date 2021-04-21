import { Context, Next, Request } from 'koa'
import * as https from 'https'
import * as querystring from 'querystring'
import config from '../config'
import logger from '../logger'

export default async function send(ctx: Context, next: Next): Promise<void> {
	try {
		const options = getOptions()
		const data = getData(ctx.request)
		await request(options, data)
		ctx.response.status = 204
	} catch (error) {
		ctx.response.status = 500
		logger.error(error)
	}

	await next()
}

function request(options: https.RequestOptions, data: string) {
	return new Promise<void>((resolve, reject) => {
		const req = https.request(options)

		req.on('response', res => {
			if (res.statusCode >= 400) return reject(res.statusCode)
			return resolve()
		})

		req.on('error', reject)

		req.write(data)

		req.end()
	})
}

function getOptions() {
	const key = Buffer.from(`api:${ config.mailgunKey }`).toString('base64')

	return {
		hostname: config.mailgunHost,
		path: `/v3/${ config.mailgunDomain }/messages`,
		method: 'POST',
		headers: {
			'Authorization': `Basic ${ key }`,
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}
}

function getData(request: Request) {
	const from = request.body.from?.trim()
	const to = request.body.to?.trim()
	const template = request.body.template?.trim()
	const variables = request.body.variables

	const subject = getSubject(template)

	return querystring.stringify({
		from: from || config.mailgunFrom,
		to,
		subject,
		template,
		'h:X-Mailgun-Variables': JSON.stringify(variables)
	})
}

function getSubject(template: string) {
	let subject = ''

	switch (template) {
		case 'emailverification':
			subject = 'Email verification'
			break

		case 'passwordreset':
			subject = 'Reset your password'
			break

		case 'newpassword':
			subject = 'Password changed'
			break
	}

	return subject
}
