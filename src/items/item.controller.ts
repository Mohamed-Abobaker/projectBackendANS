import { Controller, Get, Post, Body, Delete, Param, Res } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemEntity } from 'src/entities/item.entity'
import { Request, Response } from 'express';


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

  @Delete(':id')
  async deleteAnItem(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<any> {
    const deleted = await this.itemService.deleteItem(id)
    return response.status(deleted.statusCode).json(deleted.data)
  }
}