import { Router } from "express";
import * as ctrl from "../controllers/product.controller";
import { verifyToken, isAdmin, isMod } from "../middleware/index";

const router = Router();

router.get("/", ctrl.getProducts);

router.get("/:id", ctrl.getProductById);

router.post("/", [verifyToken, isAdmin, isMod], ctrl.createProduct);

router.put("/:id", [verifyToken, isAdmin], ctrl.updateProductById);

router.delete("/:id", [verifyToken, isAdmin], ctrl.deleteProductById);

export default router;
