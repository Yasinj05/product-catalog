import { Request, Response, NextFunction } from "express";
import { BrandService } from "../../services/BrandService";

const brandService = new BrandService();

export const validateCreateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { brand } = req.body;

  // Input validation
  if (typeof brand !== "string" || brand.trim() === "") {
    return res.status(400).json({ message: "Invalid brand name" });
  }

  // Check for existing brand
  const existingBrand = await brandService.findByName(brand);
  if (existingBrand) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  next();
};

export const validateUpdateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { brand } = req.body;

  // Input validation
  if (typeof brand !== "string" || brand.trim() === "") {
    return res.status(400).json({ message: "Invalid brand name" });
  }

  // Check for existing brand
  const existingBrand = await brandService.findByName(brand);
  if (existingBrand && existingBrand.id !== Number(id)) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  next();
};
