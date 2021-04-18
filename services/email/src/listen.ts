import * as http from 'http'
import createApp from './app'
import config from './config'
import logger from './logger'

export default function listen(): void {
	const requestListener = createApp().callback()

	http
		.createServer(requestListener)
		.listen(config.port, listeningListener)
}

function listeningListener() {
	logger.log(`Worker ${ process.pid } listening on port ${ config.port }.`)
}
