// https://github.com/Vincit/db-errors

class Logger {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log(payload: any) {
		console.log(payload)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(payload: any) {
		console.error(payload)
		console.trace()
	}
}

const logger = new Logger()
export default logger
