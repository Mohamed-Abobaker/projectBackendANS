import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service'
import { CategoryEntity } from 'src/entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, ) { }

  @Post()
  async addCategory(@Body() payload: any): Promise<any> {
    return await this.categoryService.addCategory(payload)
  }

  @Get()
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories()
  }
}