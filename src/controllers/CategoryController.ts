import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      this.handleError(res, error, "Error creating category");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.update(Number(id), req.body);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error updating category");
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) {
      this.handleError(res, error, "Error fetching categories");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.findOne(Number(id));
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching category");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await categoryService.delete(Number(id));
      if (result.affected === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error deleting category");
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
