import { AppDataSource } from "../utils/db";
import { Item } from "../entities/Item";

export class ItemService {
  private itemRepository = AppDataSource.getRepository(Item);

  async create(item: Item) {
    return this.itemRepository.save(item);
  }

  async update(id: number, item: Partial<Item>) {
    await this.itemRepository.update(id, item);
    return this.itemRepository.findOneBy({ id });
  }

  async findAll() {
    return this.itemRepository.find({ relations: ["categories"] });
  }

  async findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id },
      relations: ["categories"],
    });
  }

  async delete(id: number) {
    await this.itemRepository.delete(id);
  }

  async updateMaxStockThreshold(id: number, maxStockThreshold: number) {
    await this.itemRepository.update(id, { maxStockThreshold });
    return this.itemRepository.findOneBy({ id });
  }
}
