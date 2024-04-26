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

app.post("/" ,async (c) => {
    
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
  
      user.password = await bcrypt.hash(user.password, 10);
  
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
  
      const existingUser = await prisma.user.findUnique({
        where: {
          username: user.username
        }, select: {
          id: true
        }
      })
  
      if(existingUser){
        return c.json<ApiResponse>({
          success: false,
          message: 'User Already Exists'
        }, 409);
      }
  
      const newUser: {
        id: number;
        username: string;
        name: string | null;
      } = await prisma.user.create({
        data: user,
        select: {
          id: true,
          username: true,
          name: true
        }
      });    
  
      const token = 'Bearer ' + await sign({ id: newUser.id, username: newUser.username }, c.env.JWT_SECRET);
  
      return c.json<ApiResponse>({
        success: true,
        message: 'User Signed Up',
        userData: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name,
          token: token
        }
      })
    } catch (e) {
      
      console.log(e);
      return c.json<ApiResponse>({
        success: false,
        message: 'Server Error'
      }, 500);
    }
  });

export default app;