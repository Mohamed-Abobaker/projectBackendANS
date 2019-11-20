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


  async getCategories(): Promise<any> {
    // throw new Error('No database connection');
    try {
      const results = await this.categoryEntityRepo.find();
      if (!results.length) throw new Error('No categories found')
      return {
        statusCode: 200,
        data: results,
        error: null
      }
    }
    catch (error) {
      return {
        statusCode: 404,
        data: null,
        error: {
          message: error.message
        }
      }
    }
  }


  async getSingleCategory(id: string): Promise<any> {

    try {
      const category = await this.categoryEntityRepo.find({ where: { id: id } });
      if (category[0] == null) throw new Error(`No category found with ID ${id}`)
      return {
        statusCode: 200,
        data: category,
        error: null
      }
    }
    catch (error) {
      return {
        statusCode: 404,
        data: null,
        error: {
          message: error.message
        }
      }
    }
  }


  async addCategory(payload: any): Promise<CategoryEntity> {
    const check = await this.categoryEntityRepo
      .createQueryBuilder().where("LOWER(name) = LOWER(:name)", { name: payload.name }).getMany()

    if (check.length) throw new Error(`Category ${payload.name} already exists. Cannot replicate category`)

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