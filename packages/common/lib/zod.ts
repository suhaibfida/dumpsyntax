import { z } from "zod";
export const signupType = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(20)
    .refine((value) => !value.includes("@"), {
      message: "Username can not contain '@'",
    }),
  email: z.email().min(5).max(200),
  password: z.string().trim().min(8),
  profile: z.url().optional(),
});
export const loginType = z.object({
  usernameOrEmail: z.string().min(5).max(100),
  password: z.string().min(8).max(255),
});

export const documentType = z.object({
  title: z.string().min(1).max(1000),
  content: z.string().min(1).max(50000),
});
