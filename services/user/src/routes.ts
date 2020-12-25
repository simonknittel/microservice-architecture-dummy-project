import * as Router from '@koa/router'
import create from './routes/create'
import get from './routes/get'
import health from './routes/health'
import refreshConfig from './routes/refresh'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.get('/get', get)
router.post('/create', create)

export default router
