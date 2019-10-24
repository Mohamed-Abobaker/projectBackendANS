import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity'
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryEntity: Repository<CategoryEntity>
  ) { }


  async getCategories(): Promise<CategoryEntity[]> {
    // throw new Error('No database connection');

    const results = await this.categoryEntity.find();
    return results;
  }


  async addCategory(payload: any): Promise<CategoryEntity> {

    const response: InsertResult = await this.categoryEntity
      .createQueryBuilder().insert().values(payload).returning('*').execute();

    const createdCat: CategoryEntity = response.raw[0];
    return createdCat;
  }

  async deleteCategory(id: any): Promise<any> {
    const where = 'id = :id';
    const query = {
      id,
    };
    const response = await this.categoryEntity
      .createQueryBuilder().delete().where(where, query).execute()

    return response.raw
  }
}