import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();
const categoryController = new CategoryController();

router.post("/categories", categoryController.create.bind(categoryController));
router.put(
  "/categories/:id",
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
