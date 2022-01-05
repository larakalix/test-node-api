import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";
import {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
} from "../middleware/index";

const router = Router();

router.post("/signin", ctrl.signIn);

router.post(
    "/signup",
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    ctrl.signUp
);

export default router;
