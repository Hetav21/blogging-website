import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

type Variables = {
  userId: string;
}

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }, 
  Variables: Variables,
}>();

blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("authorization") || "";

    if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

    const payload = await verify(jwt, c.env.JWT_SECRET);

    if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  
    c.set('userId', payload.id);

    await next();
})

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello Hono!");
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello Hono!");
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello Hono!");
});

export default blogRouter;
