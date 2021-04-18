import * as http from 'http'
import createApp from './app'
import config from './config'
import logger from './logger'

export default function listen() {
	const app = createApp()

	http.createServer(app.callback())
		.listen(config.port, () => {
			logger.log(`Worker ${ process.pid } listening on port ${ config.port }.`)
		})
}
