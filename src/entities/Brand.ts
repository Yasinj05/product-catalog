import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  brand!: string;

  @OneToMany(() => Item, (item) => item.brand)
  items!: Item[];
}
