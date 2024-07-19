import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  brand!: string;
}
