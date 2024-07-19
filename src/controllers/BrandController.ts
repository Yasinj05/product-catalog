import { Request, Response } from "express";
import { BrandService } from "../services/BrandService";

const brandService = new BrandService();

export class BrandController {
  async create(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async findAll(req: Request, res: Response) {}

  async findOne(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}
