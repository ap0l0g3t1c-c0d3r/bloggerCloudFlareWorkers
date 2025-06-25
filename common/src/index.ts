import {z} from "zod"

export const signupObject = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
})

export type SignupObject = z.infer<typeof signupObject>

export const signinObject = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type SigninObject = z.infer<typeof signinObject>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().default(false)
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    id: z.string().optional()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>