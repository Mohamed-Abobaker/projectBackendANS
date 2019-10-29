import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemEntity } from '../entities/item.entity'
import { Repository, InsertResult } from 'typeorm'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    readonly itemEntityRepo: Repository<ItemEntity>
  ) { }

  async getItems(): Promise<ItemEntity[]> {
    const items = await this.itemEntityRepo.find();
    return items
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
