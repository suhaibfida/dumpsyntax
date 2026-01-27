import { Router } from "express";
import { signup, login } from "../controller/auth";
import dashboard from "../controller/dashboard";
import middleware from "../middleware/middleware";
const router: Router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", middleware, dashboard);
export default router;
