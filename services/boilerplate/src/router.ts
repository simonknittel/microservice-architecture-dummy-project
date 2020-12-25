import * as Router from '@koa/router'
import health from './routes/health'
import refreshConfig from './routes/refresh'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)

export default router
