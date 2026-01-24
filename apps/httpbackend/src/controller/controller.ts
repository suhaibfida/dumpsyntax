import { Request, Response } from "express";
import { signupType } from "@repo/common/zod";
import prisma from "@repo/db/prisma";
import bcrypt from "bcrypt";
const signup = async (req: Request, res: Response) => {
  const safeParse = signupType.safeParse(req.body);
  if (!safeParse.success) {
    return res.status(400).json({
      errors: safeParse.error.issues,
    });
  }
  try {
    const existingUser = await prisma.user.findMany({
      where: {
        OR: [
          { username: safeParse.data.username },
          { email: safeParse.data.email },
        ],
      },
    });

    if (existingUser.length > 0) {
      const checkUser = existingUser.some(
        (u) => u.username === safeParse.data.username,
      );
      const checkEmail = existingUser.some(
        (u) => u.email === safeParse.data.email,
      );
      if (checkUser || checkEmail) {
        return res.status(409).json({
          errors: {
            username: checkUser ? "Username already taken" : null,
            email: checkEmail ? "Email already taken" : null,
          },
        });
      }
    }
    const hashedPassword = await bcrypt.hash(safeParse.data.password, 10);
    await prisma.user.create({
      data: {
        username: safeParse.data.username,
        email: safeParse.data.email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (err: unknown) {
    const error = err as any;
    console.error("SignUp error:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email or username already taken",
        field: error.meta?.target,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default signup;
