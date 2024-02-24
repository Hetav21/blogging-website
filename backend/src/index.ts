import { Hono } from 'hono'
import blogRouter from './routes/blog'
import signinRouter from './routes/signin'
import signupRouter from './routes/signup'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.route('/blog', blogRouter)
app.route('/signin', signinRouter)
app.route('/signup', signupRouter)

export default app
