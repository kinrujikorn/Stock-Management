import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  categories_id: number;

  @Column()
  categories_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
