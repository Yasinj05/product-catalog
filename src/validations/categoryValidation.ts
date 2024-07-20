import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

export const validateCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, parentId } = req.body;

  // Input validation
  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ message: "Invalid category name" });
  }
  if (
    parentId !== undefined &&
    parentId !== null &&
    typeof parentId !== "number"
  ) {
    return res.status(400).json({ message: "Invalid parentId" });
  }

  // Check for duplicate category
  const existingCategory = await categoryService.findByName(category);
  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  next();
};

export const validateUpdateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { category, parentId } = req.body;

  // Input validation
  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ message: "Invalid category name" });
  }
  if (
    parentId !== undefined &&
    parentId !== null &&
    typeof parentId !== "number"
  ) {
    return res.status(400).json({ message: "Invalid parentId" });
  }

  // Check for duplicate category
  const existingCategory = await categoryService.findByName(category);
  if (existingCategory && existingCategory.id !== Number(id)) {
    return res.status(400).json({ message: "Category already exists" });
  }

  next();
};
