import { Router } from "express";
import signup from "../controller/auth";
import dashboard from "../controller/dashboard";
import middleware from "../middleware/middleware";
const router: Router = Router();
router.post("/signup", signup);
router.post("/dahboard", middleware, dashboard);
export default router;
