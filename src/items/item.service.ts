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
}
