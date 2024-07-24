import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../middlewares/validations/categoryValidation";

const router = Router();
const categoryController = new CategoryController();

router.post("/categories", validateCreateCategory, (req, res, next) =>
  categoryController.create(req, res, next).catch(next)
);
router.put("/categories/:id", validateUpdateCategory, (req, res, next) =>
  categoryController.update(req, res, next).catch(next)
);
router.get("/categories", (req, res, next) =>
  categoryController.findAll(req, res, next).catch(next)
);
router.get("/categories/:id", (req, res, next) =>
  categoryController.findOne(req, res, next).catch(next)
);
router.delete("/categories/:id", (req, res, next) =>
  categoryController.delete(req, res, next).catch(next)
);

export default router;
