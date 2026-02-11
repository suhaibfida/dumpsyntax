import { Request, Response } from "express";
import { signupType, loginType } from "@repo/common/zod";
import prisma from "@repo/db/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signup = async (req: Request, res: Response) => {
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
          { username: safeParse.data.username.toLowerCase() },
          { email: safeParse.data.email },
        ],
      },
    });

    if (existingUser.length > 0) {
      const checkUser = existingUser.some(
        (u: any) => u.username === safeParse.data.username,
      );
      const checkEmail = existingUser.some(
        (u: any) => u.email === safeParse.data.email,
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
    const hashedisPasswordCorrect = await bcrypt.hash(
      safeParse.data.password,
      10,
    );
    await prisma.user.create({
      data: {
        username: safeParse.data.username.toLowerCase(),
        email: safeParse.data.email.toLowerCase(),
        password: hashedisPasswordCorrect,
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

// -----------------------------------Login-------------------------------------------------------

export const login = async (req: Request, res: Response) => {
  const safeParse = loginType.safeParse(req.body);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT is missing");
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  if (!safeParse.success) {
    return res.status(400).json({
      error: safeParse.error.issues,
    });
  }
  try {
    const user = safeParse.data.usernameOrEmail.toLowerCase().includes("@")
      ? await prisma.user.findUnique({
          where: {
            email: safeParse.data.usernameOrEmail.toLowerCase(),
          },
        })
      : await prisma.user.findUnique({
          where: {
            username: safeParse.data.usernameOrEmail.toLowerCase(),
          },
        });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      safeParse.data.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "12d" });
    return res.status(200).json({
      token: token,
      message: "Login successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
