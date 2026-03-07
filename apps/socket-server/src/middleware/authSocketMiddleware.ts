import jwt, { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import cookie from "cookie";
interface JwtCustomPayload extends JwtPayload {
  userId: string;
}
const authSocketMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const jwt_Secret = process.env.JWT_SECRET;
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      return next(new Error("no cookies found"));
    }
    const cookies = cookie.parse(cookieHeader);
    const token = cookies.token;
    const jwtsecret = jwt_Secret;
    if (!jwtsecret) {
      return next(new Error("Token not available"));
    }
    if (!token) {
      return next(new Error("Unauthorized"));
    }
    const decoded = jwt.verify(token, jwtsecret);
    socket.data.userId = (decoded as JwtCustomPayload).userId;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
};
export default authSocketMiddleware;
