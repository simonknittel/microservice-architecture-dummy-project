import * as Router from '@koa/router'
import health from './routes/health'
import jwtLogin from './routes/jwt/login'
import jwtRefresh from './routes/jwt/refresh'
import refreshConfig from './routes/refresh'
import requestPasswordReset from './routes/request-password-reset'
import setPassword from './routes/set-password'
import signup from './routes/signup'
import verifyEmail from './routes/verify-email'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.post('/jwt/login', jwtLogin)
router.post('/jwt/refresh', jwtRefresh)
router.post('/jwt/logout', ctx => ctx.response.status = 501)
router.post('/signup', signup)
router.post('/request-password-reset', requestPasswordReset)
router.post('/set-password', setPassword)
router.get('/verify-email', verifyEmail)
router.get('/me', ctx => ctx.response.status = 501)

export default router
