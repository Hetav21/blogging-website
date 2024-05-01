import z from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  username: z.string(),
  password: z.string(),
  description: z.string().optional()
});

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  description: z.string().optional()
})

export type SignUpType = z.infer<typeof signUpSchema>


export const signInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6)
})

export type SignInType = z.infer<typeof signUpSchema>