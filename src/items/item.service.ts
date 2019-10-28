import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ItemEntity } from '../entities/item.entity'
import { Repository } from 'typeorm'

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
}