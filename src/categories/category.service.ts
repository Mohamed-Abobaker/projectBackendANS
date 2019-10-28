import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity'
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryEntityRepo: Repository<CategoryEntity>
  ) { }


  async getCategories(): Promise<CategoryEntity[]> {
    // throw new Error('No database connection');

    const results = await this.categoryEntityRepo.find();
    return results;
  }


  async addCategory(payload: any): Promise<CategoryEntity> {

    const response: InsertResult = await this.categoryEntityRepo
      .createQueryBuilder().insert().values(payload).returning('*').execute();

    const createdCat: CategoryEntity = response.raw[0];
    return createdCat;
  }



  async deleteCategory(id: string): Promise<any> {

    try {
      const category: CategoryEntity[] = await this.categoryEntityRepo
        .createQueryBuilder().select('*').where('"id" = :id', { id }).execute();

      if (category[0] == null) {
        return {
          statusCode: 404,
          data: {
            message: `No category found with ID ${id}`
          }
        }
      }

      const where = 'id = :id';
      const query = {
        id,
      };
      const response = await this.categoryEntityRepo
        .createQueryBuilder().delete().where(where, query).execute()


      return {
        statusCode: 200,
        data: {
          message: `Category ID ${id} successfully deleted`,
          other: response.raw[0]
        }
      }
    }
    catch (error) {
      return {
        statusCode: 500,
        data: {
          message: error.message
        }
      }
    }
  }
}