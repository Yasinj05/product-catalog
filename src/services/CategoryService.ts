import { Category } from "../entities/Category";
import { AppDataSource } from "../utils/db";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(id: number, category: Category) {
    return this.categoryRepository.save(category);
  }

  async update(id: number, category: Partial<Category>) {
    await this.categoryRepository.update(id, category);
    return this.categoryRepository.findOneBy({ id });
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }
}
