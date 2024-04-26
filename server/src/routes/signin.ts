import { Hono } from "hono";
import { UserSchema } from "../schemas/User";
import { user as userType } from "../types/User";
import { ApiResponse } from "../types/ApiResponse";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/", async (c) => {
  try {
    const body = (await c.req.json()) as userType;

    const user = {
      username: body.username,
      password: body.password,
    };

    const validatedUser = UserSchema.safeParse(user);

    if (!validatedUser.success) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Invalid Input",
        },
        411
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const dbUser: userType | null = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (!dbUser) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "User Doesnt Exists",
        },
        409
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      dbUser.password
    );

    if (!isPasswordCorrect) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Username and Password dont match",
        },
        403
      );
    }

    const token =
      "Bearer " +
      (await sign(
        { id: dbUser.id, username: dbUser.username },
        c.env.JWT_SECRET
      ));

    return c.json<ApiResponse>(
      {
        success: true,
        message: "User Signed In",
        userData: {
          id: dbUser.id,
          username: dbUser.username,
          name: dbUser.name,
          token: token,
        },
      },
      200
    );
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Server Error",
      },
      500
    );
  }
});

export default app;
