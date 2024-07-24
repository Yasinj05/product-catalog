import { Request, Response, NextFunction } from "express";
import { ItemService } from "../services/ItemService";

const itemService = new ItemService();

export class ItemController {
  async create(req: Request, res: Response, next: NextFunction) {
    const item = await itemService.create(req.body);
    res.status(201).json(item);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const item = await itemService.update(Number(id), req.body);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const items = await itemService.findAll();
    res.json(items);
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const item = await itemService.findOne(Number(id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const result = await itemService.delete(Number(id));
    if (result.affected === 1) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }

  async updateStockQuantity(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { maxStockThreshold } = req.body;
    const item = await itemService.updateStockQuantity(
      Number(id),
      maxStockThreshold
    );
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }
}
