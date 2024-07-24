import { Router } from "express";
import { BrandController } from "../controllers/BrandController";
import {
  validateCreateBrand,
  validateUpdateBrand,
} from "../middlewares/validations/brandValidation";

const router = Router();
const brandController = new BrandController();

router.post("/brands", validateCreateBrand, (req, res, next) =>
  brandController.create(req, res, next).catch(next)
);
router.put("/brands/:id", validateUpdateBrand, (req, res, next) =>
  brandController.update(req, res, next).catch(next)
);
router.get("/brands", (req, res, next) =>
  brandController.findAll(req, res, next).catch(next)
);
router.get("/brands/:id", (req, res, next) =>
  brandController.findOne(req, res, next).catch(next)
);
router.delete("/brands/:id", (req, res, next) =>
  brandController.delete(req, res, next).catch(next)
);

export default router;
