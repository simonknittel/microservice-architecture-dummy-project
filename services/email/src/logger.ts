// https://github.com/Vincit/db-errors

class Logger {
	log(payload: any) {
		console.log(payload)
	}

	error(payload: any) {
		console.trace(payload)
	}
}

const logger = new Logger()
export default logger
