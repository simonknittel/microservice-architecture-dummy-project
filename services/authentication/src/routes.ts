import * as Router from '@koa/router'
import login from './routes/login'
import health from './routes/health'
import signup from './routes/signup'
import refresh from './routes/refresh'

const router = new Router()

router.get('/health', health)
router.post('/login', login)
router.post('/signup', signup)
router.post('/refresh', refresh)

export default router
