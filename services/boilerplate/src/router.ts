import * as Router from '@koa/router'
import health from './routes/health'
import refresh from './routes/refresh'

const router = new Router()

router.get('/internal/health', health)
router.get('/internal/refresh', refresh)

export default router
