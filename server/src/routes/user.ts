import {
  ApiResponse,
  UserSchema,
  user as userType,
} from "@hetav21/blogging-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Token Error",
        },
        401,
      );
    }

    const payload = verify(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Token Error",
        },
        401,
      );
    }

    c.set("jwtPayload", payload);
    await next();
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Token Error",
      },
      401,
    );
  }
});

app.post("/profile/update", async (c) => {
  try {
    const body = (await c.req.json()) as userType;

    const user = {
      name: body.name,
      password: body.password,
    };

    const validatedUser = UserSchema.safeParse(user);

    if (!validatedUser.success) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Invalid Input",
        },
        411,
      );
    }

    const payload = await c.get("jwtPayload");
    const id = payload.id;

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const dbUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!dbUser) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        404,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      dbUser.password,
    );

    if (!isPasswordCorrect) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Username and Password dont match",
        },
        403,
      );
    }

    const token =
      "Bearer " +
      (await sign(
        { id: dbUser.id, username: dbUser.username },
        c.env.JWT_SECRET,
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
      200,
    );
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Server Error",
      },
      500,
    );
  }
});

export default app;
