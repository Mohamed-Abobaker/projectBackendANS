import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemEntity } from '../entities/item.entity'
import { Repository, InsertResult, Connection } from 'typeorm'
import { CategoryEntity } from '../entities/category.entity';
import * as _ from 'lodash'
import { CreateItemDto, PatchItemDto } from './item.dto'

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
      const items: ItemEntity[] = await this.itemEntityRepo.find();
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
      const item: ItemEntity[] = await this.itemEntityRepo.find({ where: { id } })
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



  async getItemsByCategory(id: string): Promise<any> {
    try {
      // const category = await this.categoryEntityRepo.find({ where: { name: Like(name) } })
      const category: CategoryEntity[] = await this.categoryEntityRepo.find({ where: { id: id } });
      if (!category.length) throw new Error(`Category ${id} not found! Please use a valid category ID`)

      const items: CategoryEntity[] = await this.categoryEntityRepo
        .find({ relations: ['items'], where: { id } });
      if (!items[0].items.length) throw new Error(`No items found in the ${id} category `)
      return {
        statusCode: 200,
        data: items[0].items,
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



  async postItem(payload: any): Promise<any> {
    try {
      const chosenCat: CategoryEntity[] = await this.categoryEntityRepo.find({ where: { id: payload.category.id } })
      if (!chosenCat.length) throw new Error('Category not recognized. Please post to a valid category.')

      payload.categoryName = chosenCat[0].name
      const response: InsertResult = await this.itemEntityRepo
        .createQueryBuilder().insert().values(payload).returning('*').execute()

      const createdItem: ItemEntity = response.raw[0];
      return {
        statusCode: 201,
        data: createdItem,
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



  async patchItem(payload: PatchItemDto, id: string): Promise<any> {
    try {
      const item = await this.itemEntityRepo.find({ where: { id } })
      if (!item.length) throw new Error(`No item found with ID ${id}`)

      const copiedItem = { ...item[0] }
      const updatedItem = {};
      for (var key in copiedItem) {
        if (payload[key]) {
          updatedItem[key] = payload[key]
        } else {
          updatedItem[key] = copiedItem[key]
        }
      }

      if (_.isEqual(copiedItem, updatedItem)) throw new Error('No changes detected in patch request')
      // const patch = jsonMergePatch.generate(item[0], payload);
      // const updates = Object.keys(patch).filter(key => patch[key] != null);
      const updated = await this.itemEntityRepo
        .createQueryBuilder().update().set(updatedItem).where('"id" = :id', { id }).returning('*').execute();

      return {
        statusCode: 200,
        data: updated.raw[0],
        error: null
      }

    }
    catch (error) {
      return {
        statusCode: 400,
        data: null,
        error: error.message
      }
    }
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
