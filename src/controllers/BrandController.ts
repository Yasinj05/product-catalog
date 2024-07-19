import { Request, Response } from "express";
import { BrandService } from "../services/BrandService";

const brandService = new BrandService();

export class BrandController {
  async create(req: Request, res: Response) {
    const brand = await brandService.create(req.body);
    res.json(brand);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const brand = await brandService.update(Number(id), req.body);
  }

  async findAll(req: Request, res: Response) {
    const brands = await brandService.findAll();
    res.json(brands);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const brand = await brandService.findOne(Number(id));
    res.json(brand);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await brandService.delete(Number(id));
    res.sendStatus(204);
  }
}
