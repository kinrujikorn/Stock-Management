import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
