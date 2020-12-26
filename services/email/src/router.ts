import * as Router from '@koa/router'
import health from './routes/health'
import refreshConfig from './routes/refresh'
import send from './routes/send'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.post('/send', send)

export default router
