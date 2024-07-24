import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../middlewares/validations/categoryValidation";

const router = Router();
const categoryController = new CategoryController();

router.post(
  "/categories",
  validateCreateCategory,
  categoryController.create.bind(categoryController)
);
router.put(
  "/categories/:id",
  validateUpdateCategory,
  categoryController.update.bind(categoryController)
);
router.get("/categories", categoryController.findAll.bind(categoryController));
router.get(
  "/categories/:id",
  categoryController.findOne.bind(categoryController)
);
router.delete(
  "/categories/:id",
  categoryController.delete.bind(categoryController)
);

export default router;
