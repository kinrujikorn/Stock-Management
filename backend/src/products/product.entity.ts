import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity'; // ปรับ path ให้ถูก

@Entity('product') // Explicitly name the table
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // Allow NULL values to match existing DB
  name: string;

  @Column({ default: 0 }) // Keep default, remove nullable
  quantity: number;

  @Column({ name: 'category_id', nullable: true }) // Remove nullable constraint
  category_id: number;

  @Column({ default: 0 }) // Keep default, remove nullable
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
