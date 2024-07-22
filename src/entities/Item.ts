import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { Brand } from "./Brand";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  slug!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 5000 })
  description!: string;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  price!: number;

  @Column({ type: "int", default: 0 })
  maxStockThreshold!: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];

  @Column("simple-json", { nullable: true })
  medias!: { name: string; url: string }[];

  @ManyToOne(() => Brand, (brand) => brand.items)
  brand!: Brand;
}
