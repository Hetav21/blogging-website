import { Hono } from 'hono'
import { UserSchema } from '../schemas/User'
import { user as userType } from '../types/User'
import { ApiResponse } from '../types/ApiResponse'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from "bcryptjs"
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    JWT_SECRET: string
    }
}>();


app.post('', (c) => {
    return c.text("Hello Hono");
  });
  
  app.put('', (c)=> {
    return c.text("Hello Hono");
  });
  
  app.get('/:id', (c) => {
    return c.text("Hello Hono");
  });
  
  app.get('/bulk', (c) => {
    return c.text("Hello Hono");
  });
  
  
  export default app