import { Context, Next } from 'koa'
import * as https from 'https'
import * as querystring from 'querystring'
import config from '../config'
import logger from '../logger'

export default function send(ctx: Context, next: Next): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const from = ctx.request.body.from?.trim()
		const to = ctx.request.body.to?.trim()
		const template = ctx.request.body.template?.trim()
		const variables = ctx.request.body.variables

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

		const data = querystring.stringify({
			from: from || config.mailgunFrom,
			to,
			subject,
			template,
			'h:X-Mailgun-Variables': JSON.stringify(variables)
		})

		const key = Buffer.from(`api:${ config.mailgunKey }`).toString('base64')

		const req = https.request({
			hostname: config.mailgunHost,
			path: `/v3/${ config.mailgunDomain }/messages`,
			method: 'POST',
			headers: {
				'Authorization': `Basic ${ key }`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}, async (res) => {
			if (res.statusCode >= 400) {
				logger.error(res.statusCode)
				ctx.response.status = 500
				await next()
				return reject()
			}

			ctx.response.status = 204
			await next()
			return resolve()
		})

		req.on('error', async error => {
			logger.error(error)
			ctx.response.status = 500
			await next()
			return reject()
		})

		req.write(data)

		req.end()
	})
}
