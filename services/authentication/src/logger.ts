// https://github.com/Vincit/db-errors

class Logger {
  log(payload: any) {
    console.log(JSON.stringify(payload))
  }

  error(payload: any) {
    console.trace(JSON.stringify(payload))
  }
}

const logger = new Logger()
export default logger
