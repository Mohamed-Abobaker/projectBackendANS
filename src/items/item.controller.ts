import { Controller, Get } from '@nestjs/common'
import { ItemService } from './item.service'

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  async getAllItems() {
    const items = await this.itemService.getItems()
    return items
  }
}