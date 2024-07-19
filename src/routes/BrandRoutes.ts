import { Router } from "express";
import { BrandController } from "../controllers/BrandController";

const router = Router();
const brandController = new BrandController();

router.post("/brands", brandController.create);
router.put("/brands/:id", brandController.update);
router.get("/brands", brandController.findAll);
router.get("/brands/:id", brandController.findOne);
router.delete("/brands/:id", brandController.delete);

export default router;
