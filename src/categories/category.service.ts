import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity'
import { Repository, InsertResult } from 'typeorm';
import { responseObj } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryEntityRepo: Repository<CategoryEntity>
  ) { }


  async getCategories(): Promise<responseObj> {
    // throw new Error('No database connection');
    try {
      const results: CategoryEntity[] = await this.categoryEntityRepo.find();
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


  async getSingleCategory(id: string): Promise<responseObj> {
    try {
      const category: CategoryEntity[] = await this.categoryEntityRepo.find({ where: { id: id } });
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


  async addCategory(payload: CategoryEntity): Promise<responseObj> {
    try {
      const check = await this.categoryEntityRepo
        .createQueryBuilder().where("LOWER(name) = LOWER(:name)", { name: payload.name }).getMany()

      if (check.length) throw new Error(`Category ${payload.name} already exists. Cannot replicate category`)
      payload.name = payload.name.charAt(0).toUpperCase() + payload.name.slice(1)
      const response: InsertResult = await this.categoryEntityRepo
        .createQueryBuilder().insert().values(payload).returning('*').execute();

      const createdCat: CategoryEntity = response.raw[0];

      return {
        statusCode: 201,
        data: createdCat,
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



  async deleteCategory(id: string): Promise<responseObj> {
    try {
      const category: CategoryEntity[] = await this.categoryEntityRepo
        .createQueryBuilder().select('*').where('"id" = :id', { id }).execute();

      if (category[0] == null) throw new Error(`No category found with ID ${id}`)

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
        },
        error: null
      }
    }
    catch (error) {
      return {
        statusCode: 500,
        data: null,
        error: {
          message: error.message
        }
      }
    }
  }
}