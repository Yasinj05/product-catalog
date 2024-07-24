import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../utils/db";
import { Brand } from "../../entities/Brand";

export const createBrandSchema = Joi.object({
  brand: Joi.string().max(100).required(),
});

export const updateBrandSchema = Joi.object({
  brand: Joi.string().max(100).optional(),
});

async function brandExists(brandName: string): Promise<boolean> {
  const brandRepository = AppDataSource.getRepository(Brand);
  const existingBrand = await brandRepository.findOne({
    where: { brand: brandName },
  });
  return existingBrand !== null;
}

export async function validateCreateBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { brand } = req.body;

  const { error } = createBrandSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  if (await brandExists(brand)) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  next();
}

export async function validateUpdateBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { brand } = req.body;

  const { error } = updateBrandSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  if (brand && (await brandExists(brand))) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  next();
}
