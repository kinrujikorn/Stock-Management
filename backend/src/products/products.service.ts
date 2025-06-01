import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  findAll(category?: string) {
    if (category) {
      return this.productRepo.find({
        where: {
          category: {
            categories_name: category,
          },
        },
        relations: ['category'], // ต้อง include ความสัมพันธ์
      });
    }

    return this.productRepo.find({
      relations: ['category'],
    });
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  update(id: string, data: CreateProductDto) {
    return this.productRepo.update(id, data);
  }

  remove(id: string) {
    return this.productRepo.delete(id);
  }
}
