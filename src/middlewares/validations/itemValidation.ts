import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../utils/db";
import { Item } from "../../entities/Item";

export const createItemSchema = Joi.object({
  slug: Joi.string().max(150).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().max(5000).required(),
  price: Joi.number().precision(2).required(),
  stockQuantity: Joi.number().integer().min(0).required(),
  category: Joi.number().integer().required(),
  medias: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
      })
    )
    .optional(),
  brand: Joi.number().integer().required(),
});

export const updateItemSchema = Joi.object({
  slug: Joi.string().max(150).optional(),
  name: Joi.string().max(100).optional(),
  description: Joi.string().max(5000).optional(),
  price: Joi.number().precision(2).optional(),
  stockQuantity: Joi.number().integer().min(0).optional(),
  category: Joi.number().integer().optional(),
  medias: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
      })
    )
    .optional(),
  brand: Joi.number().integer().optional(),
});

async function itemExists(slug: string, name: string): Promise<boolean> {
  const itemRepository = AppDataSource.getRepository(Item);
  const existingItem = await itemRepository.findOne({
    where: [{ slug }, { name }],
  });
  return existingItem !== null;
}

export async function validateCreateItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { slug, name } = req.body;

  const { error } = createItemSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  if (await itemExists(slug, name)) {
    return res
      .status(400)
      .json({ message: "Item with the same slug or name already exists" });
  }

  next();
}

export async function validateUpdateItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const { error } = updateItemSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  next();
}
