import { Context, Next } from 'koa'

/**
 * Logs requests in Common Log Format
 */
export default function commongLogFormat({
	logger = console.log
}) {
	return async function (ctx: Context, next: Next): Promise<void> {
		await next()

		const now = new Date()
		const day = now.getUTCDate()
		const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now)
		const year = now.getUTCFullYear()
		const hours = now.getUTCHours().toString().padStart(2, '0')
		const minutes = now.getUTCMinutes().toString().padStart(2, '0')
		const seconds = now.getUTCSeconds().toString().padStart(2, '0')
		const tz = '+0000'
		const date = `[${ day }/${ month }/${ year }:${ hours }:${ minutes }:${ seconds } ${ tz }]`

		const bytes = ctx.response.length || '-'

		const protocol = `HTTP/${ ctx.req.httpVersion }`

		logger(`${ ctx.request.ip } - - ${ date } "${ ctx.request.method } ${ ctx.request.url } ${ protocol }" ${ ctx.response.status } ${ bytes }`)
	}
}
