import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middlewares/validations/itemValidation";

const router = Router();
const itemController = new ItemController();

router.post(
  "/items",
  validateCreateItem,
  itemController.create.bind(itemController)
);
router.put(
  "/items/:id",
  validateUpdateItem,
  itemController.update.bind(itemController)
);
router.get("/items", itemController.findAll.bind(itemController));
router.get("/items/:id", itemController.findOne.bind(itemController));
router.delete("/items/:id", itemController.delete.bind(itemController));
router.patch(
  "/items/:id/MaxStockThreshold",
  itemController.updateStockQuantity.bind(itemController)
);

export default router;
