// TODO: Integrate configuration service

class Config {
	port: number

	mailgunHost: string
	mailgunDomain: string
	mailgunKey: string
	mailgunFrom: string

	constructor() {
		this.refresh()
	}

	refresh() {
		return new Promise<void>(resolve => {
			this.port = parseInt(process.env.PORT) || 3000

			this.mailgunHost = process.env.MAILGUN_HOST
			this.mailgunDomain = process.env.MAILGUN_DOMAIN
			this.mailgunKey = process.env.MAILGUN_KEY
			this.mailgunFrom = process.env.MAILGUN_FROM

			resolve()
		})
	}
}

const config = new Config()
export default config
