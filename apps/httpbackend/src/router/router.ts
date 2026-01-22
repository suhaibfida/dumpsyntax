import { Router } from "express";
import signup from "./../controller/controller";
const router: Router = Router();
router.post("/signup", signup);
export default router;
