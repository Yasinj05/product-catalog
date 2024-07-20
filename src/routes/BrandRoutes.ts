import { Router } from "express";
import { BrandController } from "../controllers/BrandController";
import {
  validateCreateBrand,
  validateUpdateBrand,
} from "../validations/brandValidation";

const router = Router();
const brandController = new BrandController();

router.post(
  "/brands",
  validateCreateBrand,
  brandController.create.bind(brandController)
);
router.put(
  "/brands/:id",
  validateUpdateBrand,
  brandController.update.bind(brandController)
);
router.get("/brands", brandController.findAll.bind(brandController));
router.get("/brands/:id", brandController.findOne.bind(brandController));
router.delete("/brands/:id", brandController.delete.bind(brandController));

export default router;
