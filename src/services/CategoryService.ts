import { Category } from "../entities/Category";
import { AppDataSource } from "../utils/db";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(category: Category) {
    return this.categoryRepository.save(category);
  }

  async update(id: number, category: Partial<Category>) {
    await this.categoryRepository.update(id, category);
    return this.categoryRepository.findOneBy({ id });
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      relations: ["children"],
    });
    const rootCategories = categories.filter((category) => !category.parentId);
    return rootCategories;
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ["children"],
    });
  }

  async delete(id: number): Promise<{ affected: number }> {
    const result = await this.categoryRepository.delete(id);
    return { affected: result.affected || 0 };
  }

  async findByName(category: string) {
    return this.categoryRepository.findOne({ where: { category } });
  }
}
