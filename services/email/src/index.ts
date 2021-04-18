import * as cluster from 'cluster'
import * as os from 'os'
import logger from './logger'
import listen from './listen'

if (cluster.isMaster) {
	logger.log(`Master ${ process.pid } is running.`)

	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork()
	}

	cluster.on('exit', worker => {
		logger.log(`Worker ${ worker.process.pid } died.`)
	})
} else {
	listen()
}
