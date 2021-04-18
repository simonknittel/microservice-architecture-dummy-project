import createApp from '../app'
import * as supertest from 'supertest'

const app = createApp().callback()

test('/internal/health to return 204', done => {
	supertest(app)
		.get('/internal/health')
		.expect(204, done)
})
