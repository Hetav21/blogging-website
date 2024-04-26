import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { UserSchema } from './schemas/User'
import { user as userType } from './types/User'
import { ApiResponse } from './types/ApiResponse'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.use('/api/*', cors())

app.all('/', (c) => {
  return c.text('Hello World');  
})

app.post('/api/v1/user/signup', async (c) => {
    
  try{

    const body = await c.req.json() as userType;
  
    const user = {
      username: body.username,
      password: body.password,
      name: body.name
    }

    const validatedUser = UserSchema.safeParse(user);
    
    if (!validatedUser.success) {
      return c.json<ApiResponse>({
        success: false,
        message: 'Invalid Input'
      }, 411);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const newUser: userType = await prisma.user.create({
      data: user
    });

    return c.json<ApiResponse>({
      success: true,
      message: 'User Created',
      user: newUser
    })

  } catch (e) {
    
    console.log(e);
    return c.json<ApiResponse>({
      success: false,
      message: 'Server Error'
    }, 500);
  
  }
});

app.post('/api/v1/user/signin', (c) => {
  return c.text("Hello Hono");
});

app.post('/api/v1/blog', (c) => {
  return c.text("Hello Hono");
});

app.put('/api/v1/blog', (c)=> {
  return c.text("Hello Hono");
});

app.get('/api/v1/blog/:id', (c) => {
  return c.text("Hello Hono");
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("Hello Hono");
});


export default app