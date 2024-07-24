import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../utils/db";
import { Category } from "../../entities/Category";

export const createCategorySchema = Joi.object({
  category: Joi.string().max(100).required(),
  parentId: Joi.number().optional().allow(null),
});

export const updateCategorySchema = Joi.object({
  category: Joi.string().max(100).optional(),
  parentId: Joi.number().optional().allow(null),
});

async function categoryExists(categoryName: string): Promise<boolean> {
  const categoryRepository = AppDataSource.getRepository(Category);
  const existingCategory = await categoryRepository.findOne({
    where: { category: categoryName },
  });
  return existingCategory !== null;
}

export async function validateCreateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category } = req.body;

  const { error } = createCategorySchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  if (await categoryExists(category)) {
    return res.status(400).json({ message: "Category already exists" });
  }

  next();
}

export async function validateUpdateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category } = req.body;

  const { error } = updateCategorySchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  if (category && (await categoryExists(category))) {
    return res.status(400).json({ message: "Category already exists" });
  }

  next();
}
