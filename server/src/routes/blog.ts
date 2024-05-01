import { Hono } from "hono";
import { UserSchema } from "@hetav21/common-medium";
import { BlogBasicSchema, BlogSchema } from "@hetav21/common-medium";
import { user as userType } from "@hetav21/common-medium";
import { blog as blogType } from "@hetav21/common-medium";
import { ApiResponse } from "@hetav21/common-medium";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "hono/jwt";
import { z } from "zod";

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
        401
      );
    }

    const payload = verify(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Token Error",
        },
        401
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
      401
    );
  }
});

app.post("/", async (c) => {
  try {
    const details: {
      id: number;
      username: string;
    } = await c.get("jwtPayload");

    const blog: {
      authorId: number;
      title: string;
      content: string;
    } = await c.req.json<{
      authorId: number;
      title: string;
      content: string;
    }>();

    blog.authorId = details.id;

    const validateAuthorId = z.number().safeParse(blog.authorId);
    const validateBlog = BlogBasicSchema.safeParse(blog);

    if (!validateBlog.success || !validateAuthorId.success) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Invalid Blog",
        },
        400
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const newBlog = await prisma.blog.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: details.id,
      },
    });

    return c.json<ApiResponse>({
      success: true,
      message: "Blog Created",
      blogId: newBlog.id,
      blog: newBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      500
    );
  }
});

app.put("/", async (c) => {
  try {
    const details: {
      id: number;
      username: string;
    } = c.get("jwtPayload");

    const blog: {
      id: string;
      title: string;
      content: string;
    } = await c.req.json<{
      id: string;
      title: string;
      content: string;
    }>();

    const validateId = z.string().uuid().safeParse(blog.id);
    const validateBlog = BlogBasicSchema.safeParse(blog);

    if (!validateBlog.success || !validateId.success) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Invalid Blog or Id",
        },
        400
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const dbBlog = await prisma.blog.update({
      where: {
        id: blog.id,
      },
      data: {
        title: blog.title,
        content: blog.content,
      },
    });

    if (!dbBlog) {
      return c.json<ApiResponse>({
        success: false,
        message: "Blog Not Found",
      });
    }

    return c.json<ApiResponse>({
      success: true,
      message: "Blog Updated",
      blog: dbBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      500
    );
  }
});

app.get("/bulk", async (c) => {
  try {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const data= c.req.query();

    const s = parseInt(data.s) || 0;
    const t = parseInt(data.t) || 100;

    const skip = s;
    const take = t;

    const blogs = await prisma.blog.findMany({
      skip,
      take,
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true, 
        publishedDate: true,
        published: true,
        author: {
          select: {
            name: true,
            id: true
          }
        }
      }, orderBy: {
        publishedDate: "desc"
      }
    });

    return c.json<ApiResponse>({
      success: true,
      blogs: blogs,
    });
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      500
    );
  }
});

app.get("/:id", async (c) => {
  try {
    // @ts-ignore
    const id = c.req.param("id");

    const validateId = z.string().uuid().safeParse(id);

    if (!validateId.success) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Invalid Id",
        },
        400
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const dbBlog = await prisma.blog.findUnique({
      where: {
        id: id,
      }, select: {
        id: true,
        title: true,
        content: true,
        authorId: true, 
        publishedDate: true,
        published: true,
        author: {
          select: {
            name: true,
            id: true,
            description: true
          }
        }
      }
    });

    if (!dbBlog) {
      return c.json<ApiResponse>(
        {
          success: false,
          message: "Blog Not Found",
        },
        404
      );
    }

    return c.json<ApiResponse>({
      success: true,
      blogId: dbBlog.id,
      blog: dbBlog,
    });
  } catch (e) {
    console.log(e);
    return c.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
      },
      500
    );
  }
});

export default app;
