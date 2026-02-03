import { Socket } from "socket.io";
type Handler<T extends unknown[]> = (...args: T) => Promise<void>;
const errHandler =
  <T extends unknown[]>(socket: Socket, handler: Handler<T>) =>
  async (...args: T) => {
    try {
      await handler(...args);
    } catch (err) {
      console.error(err);
      socket.emit("error", "Internal server error");
    }
  };
export default errHandler;
