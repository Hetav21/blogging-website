import z from "zod";

const BLOG_MIN_LENGTH_CONTENT = 1;
const BLOG_MIN_LENGTH_TITLE = 1;

export const BlogSchema = z.object({
  id: z.string().uuid(),
  authorId: z.number(),
  published: z.boolean().optional(),
  title: z.string().min(BLOG_MIN_LENGTH_TITLE),
  content: z.string().min(BLOG_MIN_LENGTH_CONTENT),
});

export const BlogBasicSchema = z.object({
  title: z.string().min(BLOG_MIN_LENGTH_TITLE),
  content: z.string().min(BLOG_MIN_LENGTH_CONTENT),
});
