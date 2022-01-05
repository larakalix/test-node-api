import { Router } from "express";
import * as ctrl from "../controllers/user.controller";
import { verifyToken, isAdmin, isMod } from "../middleware/index";

const router = Router();

router.get("/", [verifyToken, isAdmin], ctrl.getUsers);

router.post("/", [verifyToken, isAdmin], ctrl.getUsers);

export default router;
