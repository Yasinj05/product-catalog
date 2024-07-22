import { AppDataSource } from "../utils/db";
import { Item } from "../entities/Item";
import { Category } from "../entities/Category";
import { Brand } from "../entities/Brand";
import { In } from "typeorm";

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);
  private categoryRepository = AppDataSource.getRepository(Category);
  private brandRepository = AppDataSource.getRepository(Brand);

  async create(itemData: Partial<Item>) {
    const { categories, brand, ...rest } = itemData;

    let categoryEntities: Category[] = [];
    if (categories && categories.length > 0) {
      // Use findBy to get multiple categories
      categoryEntities = await this.categoryRepository.findBy({
        id: In(categories.map((id) => Number(id))),
      });
    }

    let brandEntity: Brand | undefined;
    if (brand) {
      brandEntity =
        (await this.brandRepository.findOneBy({ id: Number(brand) })) ??
        undefined;
    }

    const item = this.itemRepository.create({
      ...rest,
      categories: categoryEntities,
      brand: brandEntity,
    });

    return this.itemRepository.save(item);
  }

  async update(id: number, itemData: Partial<Item>) {
    const { categories, brand, ...rest } = itemData;

    let categoryEntities: Category[] = [];
    if (categories && categories.length > 0) {
      // Use findBy to get multiple categories
      categoryEntities = await this.categoryRepository.findBy({
        id: In(categories.map((id) => Number(id))),
      });
    }

    let brandEntity: Brand | undefined;
    if (brand) {
      brandEntity =
        (await this.brandRepository.findOneBy({ id: Number(brand) })) ??
        undefined;
    }

    await this.itemRepository.update(id, {
      ...rest,
    });

    return this.itemRepository.findOne({
      where: { id },
      relations: ["categories", "brand"],
    });
  }

  async findAll() {
    return this.itemRepository.find({
      relations: ["categories", "brand"],
    });
  }

  async findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id },
      relations: ["categories", "brand"],
    });
  }

  async delete(id: number): Promise<{ affected: number }> {
    const result = await this.itemRepository.delete(id);
    return { affected: result.affected || 0 };
  }

  async findByName(name: string) {
    return this.itemRepository.findOne({
      where: { name },
      relations: ["categories", "brand"],
    });
  }

  async updateMaxStockThreshold(id: number, maxStockThreshold: number) {
    await this.itemRepository.update(id, { maxStockThreshold });
    return this.itemRepository.findOne({
      where: { id },
      relations: ["categories", "brand"],
    });
  }
}
