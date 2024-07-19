import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Item, (item) => item.categories)
  items!: Item[];
}
