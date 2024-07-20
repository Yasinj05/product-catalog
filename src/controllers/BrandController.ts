import { Request, Response, NextFunction } from "express";
import { BrandService } from "../services/BrandService";

const brandService = new BrandService();

export class BrandController {
  async create(req: Request, res: Response) {
    try {
      const { brand } = req.body;

      // Input validation
      if (typeof brand !== "string" || brand.trim() === "") {
        return res.status(400).json({ message: "Invalid brand name" });
      }

      const existingBrand = await brandService.findByName(brand);
      if (existingBrand) {
        return res.status(400).json({ message: "Brand already exists" });
      }

      const newBrand = await brandService.create(req.body);
      res.status(201).json(newBrand);
    } catch (error) {
      this.handleError(res, error, "Error creating brand");
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { brand } = req.body;

      // Input validation
      if (typeof brand !== "string" || brand.trim() === "") {
        return res.status(400).json({ message: "Invalid brand name" });
      }

      const existingBrand = await brandService.findByName(brand);
      if (existingBrand && existingBrand.id !== Number(id)) {
        return res.status(400).json({ message: "Brand already exists" });
      }

      const updatedBrand = await brandService.update(Number(id), req.body);
      if (updatedBrand) {
        res.json(updatedBrand);
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const brands = await brandService.findAll();
      res.json(brands);
    } catch (error) {
      this.handleError(res, error, "Error fetching brands");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await brandService.findOne(Number(id));
      if (brand) {
        res.json(brand);
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error fetching brand");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await brandService.delete(Number(id));
      if (result.affected === 1) {
        res.status(200).json({ message: "Brand deleted successfully" });
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      this.handleError(res, error, "Error deleting brand");
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
