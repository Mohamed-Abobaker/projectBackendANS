import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemEntity } from '../entities/item.entity'
import { Repository, InsertResult } from 'typeorm'
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    readonly itemEntityRepo: Repository<ItemEntity>,

    @InjectRepository(CategoryEntity)
    readonly categoryEntityRepo: Repository<CategoryEntity>,
  ) { }



  async getItems(): Promise<any> {
    try {
      const items = await this.itemEntityRepo.find();
      if (!items.length) throw new Error('No items found')
      return {
        statusCode: 200,
        data: items,
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



  async getItemById(id: string) {
    try {
      const item = await this.itemEntityRepo.find({ where: { id } })
      if (!item.length) throw new Error(`No item found with ID ${id}`)

      return {
        statusCode: 200,
        data: item,
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


  async getItemsByCategory(name: string): Promise<any> {
    try {
      // const category = await this.categoryEntityRepo.find({ where: { name: Like(name) } })
      const category = await this.categoryEntityRepo.createQueryBuilder().where("LOWER(name) = LOWER(:name)", { name })
        .getMany();
      if (!category.length) throw new Error(`Category ${name} not found!`)

      const items = await this.itemEntityRepo.createQueryBuilder().where("LOWER(category) = LOWER(:name)", { name })
        .getMany();
      if (!items.length) throw new Error(`No items found in the ${name} category `)
      return {
        statusCode: 200,
        data: items,
        error: null
      }
    }
    catch (error) {
      return {
        statusCode: 404,
        data: null,
        error: error.message
      }
    }
  }




  async postItem(payload: any): Promise<ItemEntity> {
    const response: InsertResult = await this.itemEntityRepo
      .createQueryBuilder().insert().values(payload).returning('*').execute()

    const createdItem: ItemEntity = response.raw[0];
    return createdItem
  }



  async deleteItem(id: string): Promise<any> {
    try {
      const item = await this.itemEntityRepo
        .createQueryBuilder().select('*')
        .where('"id"=:id', { id }).execute();

      if (item[0] == null) {
        return {
          statusCode: 404,
          data: {
            message: `No item found with ID ${id}`
          }
        }
      }

      const response = await this.itemEntityRepo
        .createQueryBuilder().delete()
        .where('"id"=:id', { id }).execute();

      return {
        statusCode: 200,
        data: {
          message: `Item ID ${id} successfully deleted`,
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
