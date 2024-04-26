import z from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  username: z.string(),
  password: z.string(),
});
