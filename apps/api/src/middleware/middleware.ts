import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
interface JwtCustomPayload extends JwtPayload {
  id: string;
}
const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      error: "Invalid session",
    });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      return res.json({
        error: "Invalid token payload",
      });
    }
    req.userId = (decoded as JwtCustomPayload).id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      error: "Session expired,please login again ",
    });
  }
};
export default middleware;
