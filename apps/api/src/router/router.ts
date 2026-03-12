import { Router } from "express";
import { Response, Request } from "express";
import { signup, login } from "../controller/auth";
import dashboard from "../controller/createDocument";
import middleware from "../middleware/middleware";
import createDocument from "../controller/createDocument";
import joinDocument from "../controller/createDocument";
import showDocument from "../controller/showDocument";
import { logout } from "../controller/auth";
const router: Router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", middleware, dashboard);
router.post("/dashboard/createdocument", middleware, createDocument);
router.post("/joindocument", middleware, joinDocument);
router.post("/showDocument", middleware, showDocument);
router.post("/logout", middleware, logout);
router.get("/me", middleware, (req: Request, res: Response) => {
  return res.json({
    message: "Authentication complete",
  });
});
export default router;
