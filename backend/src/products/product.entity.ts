import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categories } from '../categories/categories.entity'; // ปรับ path ให้ถูก

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Categories, (category) => category.products)
  category: Categories;
}
