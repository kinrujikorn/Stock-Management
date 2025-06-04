import { Injectable, BadRequestException } from '@nestjs/common';
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
            category_name: category,
          },
        },
        relations: ['category'], // ต้อง include ความสัมพันธ์
      });
    }

    return this.productRepo.find({
      relations: ['category'],
    });
  }

  async create(data: CreateProductDto) {
    if (!data.name) {
      throw new BadRequestException('Product name is required');
    }
    const newProduct = this.productRepo.create({
      name: data.name,
      quantity: data.quantity,
      category_id: data.category_id,
      price: data.price,
    });

    return await this.productRepo.save(newProduct);
  }

  update(id: string, data: CreateProductDto) {
    return this.productRepo.update(id, data);
  }

  remove(id: string) {
    return this.productRepo.delete(id);
  }
}
