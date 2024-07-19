import { Router } from "express";
import { BrandController } from "../controllers/BrandController";

const router = Router();
const brandController = new BrandController();

router.post("/brands", brandController.create.bind(brandController));
router.put("/brands/:id", brandController.update.bind(brandController));
router.get("/brands", brandController.findAll.bind(brandController));
router.get("/brands/:id", brandController.findOne.bind(brandController));
router.delete("/brands/:id", brandController.delete.bind(brandController));

export default router;
