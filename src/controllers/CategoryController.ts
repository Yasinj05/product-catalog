import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    const newCategory = await categoryService.create(req.body);
    res.status(201).json(newCategory);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const updatedCategory = await categoryService.update(Number(id), req.body);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const categories = await categoryService.findAll();
    res.json(categories);
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const category = await categoryService.findOne(Number(id));
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const result = await categoryService.delete(Number(id));
    if (result.affected === 1) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  }
}
