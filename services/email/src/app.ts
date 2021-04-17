import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import commonLogFormat from './middleware/commonLogFormat'
import config from './config'
import logger from './logger'
import router from './router'

export default function createApp() {
	return new Koa()
		.use(commonLogFormat({ logger: logger.log }))
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods())
		.listen(config.port, () => {
			logger.log(`Worker ${ process.pid } listening on port ${ config.port }.`)
		})
}
