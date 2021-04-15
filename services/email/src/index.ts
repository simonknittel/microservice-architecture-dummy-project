import * as bodyParser from 'koa-bodyparser'
import * as cluster from 'cluster'
import * as Koa from 'koa'
import * as os from 'os'
import commonLogFormat from './middleware/commonLogFormat'
import config from './config'
import logger from './logger'
import router from './router'

if (cluster.isMaster) {
	logger.log(`Master ${ process.pid } is running.`)

	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork()
	}

	cluster.on('exit', worker => {
		logger.log(`Worker ${ worker.process.pid } died.`)
	})
} else {
	new Koa()
		.use(commonLogFormat)
		.use(bodyParser())
		.use(router.routes())
		.use(router.allowedMethods())
		.listen(config.port, () => {
			logger.log(`Worker ${ process.pid } listening on port ${ config.port }.`)
		})
}
