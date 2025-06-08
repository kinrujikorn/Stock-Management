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
      image_url: data.image_url,
      link: data.link,
      created_at: data.created_at || new Date().toISOString(),
    });

    return await this.productRepo.save(newProduct);
  }

  async update(id: string, data: CreateProductDto) {
    // Make sure CreateProductDto includes image_url
    return this.productRepo.update(id, {
      ...data,
      image_url: data.image_url,
    });
  }

  remove(id: string) {
    return this.productRepo.delete(id);
  }
}
