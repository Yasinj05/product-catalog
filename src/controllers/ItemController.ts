import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";

const itemService = new ItemService();

export class ItemController {
  async create(req: Request, res: Response) {
    try {
      const item = await itemService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      this.handleError(res, error, "Error creating item");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.update(Number(id), req.body);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error updating item");
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const items = await itemService.findAll();
      res.json(items);
    } catch (error) {
      this.handleError(res, error, "Error fetching items");
    }
  }
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.findOne(Number(id));
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching item");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await itemService.delete(Number(id));
      if (result.affected === 1) {
        res.status(200).json({ message: "Item deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error deleting item");
    }
  }
  async updateMaxStockThreshold(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { maxStockThreshold } = req.body;
      const item = await itemService.updateMaxStockThreshold(
        Number(id),
        maxStockThreshold
      );
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error updating max stock threshold");
    }
  }

  private handleError(res: Response, error: unknown, defaultMessage: string) {
    if (error instanceof Error) {
      res.status(500).json({ message: defaultMessage, error: error.message });
    } else {
      res.status(500).json({ message: defaultMessage, error: String(error) });
    }
  }
}
