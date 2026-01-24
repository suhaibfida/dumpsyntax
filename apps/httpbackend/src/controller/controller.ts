import { Request, Response } from "express";
import { signupType } from "@repo/common/zod";
const signup = (req: Request, res: Response) => {
  const safeParse = signupType.safeParse(req.body);
};
export default signup;
