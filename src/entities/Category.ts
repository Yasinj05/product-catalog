import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  category!: string;

  @Column({ nullable: true })
  parentId!: number;

  @ManyToOne(() => Category, (category) => category.children)
  parent!: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children!: Category[];
}
