import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];

  @Column("simple-json", { nullable: true })
  medias!: { name: string; url: string }[];
}
