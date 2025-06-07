import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async create(data: CreateCategoryDto) {
    if (!data.category_name) {
      throw new BadRequestException('Category name is required');
    }
    const newCategory = this.categoryRepo.create({
      category_name: data.category_name,
    });

    return await this.categoryRepo.save(newCategory);
  }
}
