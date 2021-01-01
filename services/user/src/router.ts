import * as Router from '@koa/router'
import create from './routes/create'
import get from './routes/get'
import health from './routes/health'
import refresh from './routes/refresh'
import update from './routes/update'

const router = new Router()

router.get('/internal/health', health)
router.get('/internal/refresh', refresh)
router.get('/users/find', get)
router.post('/users', create)
router.patch('/users/:userId', update)

export default router
