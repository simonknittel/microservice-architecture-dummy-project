import * as Router from '@koa/router'
import health from './routes/health'
import refresh from './routes/refresh'
import send from './routes/send'

const router = new Router()

router.get('/internal/health', health)
router.get('/internal/refresh', refresh)
router.post('/send', send)

export default router
