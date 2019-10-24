import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity'
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryEntity: Repository<CategoryEntity>
  ) { }

  async getCategories(): Promise<CategoryEntity[]> {
    const results = await this.categoryEntity.find();
    return results;
  }

  async addCategory(payload): Promise<any> {
    await this.categoryEntity.createQueryBuilder().insert().values(payload).returning('*').execute()
  }
}