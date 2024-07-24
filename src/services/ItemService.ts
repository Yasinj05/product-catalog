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

    const categoryEntity = await this.getCategoryEntity(
      categoryId as number | undefined
    );
    const brandEntity = await this.getBrandEntity(
      brandId as number | undefined
    );

    const item = this.itemRepository.create({
      ...rest,
      category: categoryEntity,
      brand: brandEntity,
    });

    return this.itemRepository.save(item);
  }

  async update(id: number, itemData: Partial<Item>) {
    const { category: categoryId, brand: brandId, ...rest } = itemData;

    const categoryEntity = await this.getCategoryEntity(
      categoryId as number | undefined
    );
    const brandEntity = await this.getBrandEntity(
      brandId as number | undefined
    );

    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) return null;

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

  async updateStockQuantity(id: number, stockQuantity: number) {
    await this.itemRepository.update(id, { stockQuantity });
    return this.itemRepository.findOne({
      where: { id },
      relations: ["category", "brand"],
    });
  }

  private async getCategoryEntity(categoryId?: number) {
    if (typeof categoryId === "number") {
      return (
        (await this.categoryRepository.findOne({
          where: { id: categoryId },
        })) ?? undefined
      );
    }
    return undefined;
  }

  private async getBrandEntity(brandId?: number) {
    if (typeof brandId === "number") {
      return (
        (await this.brandRepository.findOne({ where: { id: brandId } })) ??
        undefined
      );
    }
    return undefined;
  }
}
