import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import {
  validateCreateItem,
  validateUpdateItem,
} from "../middlewares/validations/itemValidation";

const router = Router();
const itemController = new ItemController();

router.post("/items", validateCreateItem, (req, res, next) =>
  itemController.create(req, res, next).catch(next)
);
router.put("/items/:id", validateUpdateItem, (req, res, next) =>
  itemController.update(req, res, next).catch(next)
);
router.get("/items", (req, res, next) =>
  itemController.findAll(req, res, next).catch(next)
);
router.get("/items/:id", (req, res, next) =>
  itemController.findOne(req, res, next).catch(next)
);
router.delete("/items/:id", (req, res, next) =>
  itemController.delete(req, res, next).catch(next)
);
router.patch("/items/:id/stock", (req, res, next) =>
  itemController.updateStockQuantity(req, res, next).catch(next)
);

export default router;
