import { Context, Next } from 'koa'
import logger from '../logger'

/**
 * Logs requests in Common Log Format
 */
export default async function commonLogFormat(ctx: Context, next: Next): Promise<void> {
	await next()

	const now = new Date()
	const day = now.getUTCDate()
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now)
	const year = now.getUTCFullYear()
	const hours = now.getUTCHours() > 9 ? now.getUTCHours() : `0${ now.getUTCHours() }`
	const minutes = now.getUTCMinutes() > 9 ? now.getUTCMinutes() : `0${ now.getUTCMinutes() }`
	const seconds = now.getUTCSeconds() > 9 ? now.getUTCSeconds() : `0${ now.getUTCSeconds() }`
	const tz = '+0000'
	const date = `[${ day }/${ month }/${ year }:${ hours }:${ minutes }:${ seconds } ${ tz }]`

	const bytes = ctx.response.length || '-'

	const protocol = `HTTP/${ ctx.req.httpVersion }`

	logger.log(`${ ctx.request.ip } - - ${ date } "${ ctx.request.method } ${ ctx.request.url } ${ protocol }" ${ ctx.response.status } ${ bytes }`)
}
