import { z } from "zod";
export const signupType = z.object({
  username: z.string().trim().toLowerCase().min(3).max(20),
  email: z.email().min(5).max(200),
  password: z.string().trim().min(8),
  profile: z.url().optional(),
});
