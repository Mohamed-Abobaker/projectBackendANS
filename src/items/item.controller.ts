import { Controller, Get, Post, Body } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemEntity } from 'src/entities/item.entity'

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  async getAllItems(): Promise<ItemEntity[]> {
    const items = await this.itemService.getItems()
    return items
  }

  @Post()
  async postNewItem(@Body() payload: any): Promise<ItemEntity> {
    const response = await this.itemService.postItem(payload)
    return response
  }
}