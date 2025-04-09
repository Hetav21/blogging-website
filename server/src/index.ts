import { Hono } from "hono";
import { cors } from "hono/cors";
import signupRouter from "./routes/signup";
import signinRouter from "./routes/signin";
import blogRouter from "./routes/blog";
import { Context } from "hono";

const app = new Hono<{
  Bindings: {
    ALLOWED_ORIGINS: string;
  };
}>();

app.use(async (c, next) => {
  cors({
    origin: c.env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  });

  await next();
});

app.all("/", (c) => {
  return c.text("Server Healthy");
});

app.route("/api/v1/user/signup", signupRouter);

app.route("/api/v1/user/signin", signinRouter);

app.route("/api/v1/blog", blogRouter);

export default app;
