import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Item, (item) => item.brand)
  items!: Item[];
}
