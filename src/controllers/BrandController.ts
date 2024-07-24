import { Request, Response, NextFunction } from "express";
import { BrandService } from "../services/BrandService";

const brandService = new BrandService();

export class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    const newBrand = await brandService.create(req.body);
    res.status(201).json(newBrand);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const updatedBrand = await brandService.update(Number(id), req.body);
    if (updatedBrand) {
      res.json(updatedBrand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const brands = await brandService.findAll();
    res.json(brands);
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const brand = await brandService.findOne(Number(id));
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const result = await brandService.delete(Number(id));
    if (result.affected === 1) {
      res.status(200).json({ message: "Brand deleted successfully" });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  }
}
