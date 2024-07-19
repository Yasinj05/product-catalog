import { Brand } from "../entities/Brand";
import { AppDataSource } from "../utils/db";

export class BrandService {
  private brandRepository = AppDataSource.getRepository(Brand);

  async create(brand: Brand) {
    return this.brandRepository.save(brand);
  }

  async update(id: number, brand: Partial<Brand>) {
    await this.brandRepository.update(id, brand);
    return this.brandRepository.findOneBy({ id });
  }

  async findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    return this.brandRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.brandRepository.delete({ id });
  }
}
