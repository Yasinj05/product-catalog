import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Brand } from "./Brand";
import { Category } from "./Category";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Brand, (brand) => brand.items)
  brand!: Brand;

  @ManyToMany(() => Category, (category) => category.items)
  @JoinTable()
  categories!: Category[];
}
