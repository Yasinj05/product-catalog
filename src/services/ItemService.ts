import { AppDataSource } from "../utils/db";
import { Item } from "../entities/Item";
import { Category } from "../entities/Category";
import { Brand } from "../entities/Brand";

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);
  private categoryRepository = AppDataSource.getRepository(Category);
  private brandRepository = AppDataSource.getRepository(Brand);

  async create(itemData: Partial<Item>) {
    const { category: categoryId, brand: brandId, ...rest } = itemData;

    // Handle category (assuming a single category here)
    let categoryEntity: Category | undefined;
    if (typeof categoryId === "number") {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      categoryEntity = category ?? undefined;
    }

    // Handle brand
    let brandEntity: Brand | undefined;
    if (typeof brandId === "number") {
      const brand = await this.brandRepository.findOne({
        where: { id: brandId },
      });
      brandEntity = brand ?? undefined;
    }

    // Create the item
    const item = this.itemRepository.create({
      ...rest,
      category: categoryEntity,
      brand: brandEntity,
    });

    return this.itemRepository.save(item);
  }

  async update(id: number, itemData: Partial<Item>) {
    const { category: categoryId, brand: brandId, ...rest } = itemData;

    // Handle category (assuming a single category here)
    let categoryEntity: Category | undefined;
    if (typeof categoryId === "number") {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      categoryEntity = category ?? undefined;
    }

    // Handle brand
    let brandEntity: Brand | undefined;
    if (typeof brandId === "number") {
      const brand = await this.brandRepository.findOne({
        where: { id: brandId },
      });
      brandEntity = brand ?? undefined;
    }

    // Update the item
    await this.itemRepository.update(id, {
      ...rest,
      category: categoryEntity,
      brand: brandEntity,
    });

    return this.itemRepository.findOne({
      where: { id },
      relations: ["category", "brand"],
    });
  }

  async findAll() {
    return this.itemRepository.find({
      relations: ["category", "brand"],
    });
  }

  async findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id },
      relations: ["category", "brand"],
    });
  }

  async delete(id: number): Promise<{ affected: number }> {
    const result = await this.itemRepository.delete(id);
    return { affected: result.affected || 0 };
  }

  async updateMaxStockThreshold(id: number, maxStockThreshold: number) {
    await this.itemRepository.update(id, { maxStockThreshold });
    return this.itemRepository.findOne({
      where: { id },
      relations: ["category", "brand"],
    });
  }
}
