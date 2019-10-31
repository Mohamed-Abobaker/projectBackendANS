import { Controller, Get, Post, Body, Delete, Param, Res, Patch } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemEntity } from 'src/entities/item.entity'
import { Request, Response } from 'express';
import { CreateItemDto } from './item.dto';


@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  async getAllItems(
    @Res() response: Response,
  ): Promise<Response> {
    const items = await this.itemService.getItems()
    return response.status(items.statusCode).json({
      data: items.data,
      error: items.error
    })
  }



  @Get(':id')
  async getSingleItem(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const item = await this.itemService.getItemById(id)
    return response.status(item.statusCode).json({
      data: item.data,
      error: item.error
    })
  }



  @Get('category/:name')
  async getItemsByCategory(
    @Param('name') name: string,
    @Res() response: Response
  ): Promise<Response> {
    const itemsList = await this.itemService.getItemsByCategory(name)
    return response.status(itemsList.statusCode).json({
      data: itemsList.data,
      error: itemsList.error

    })
  }



  @Post()
  async postNewItem(@Body() payload: any): Promise<ItemEntity> {
    const response = await this.itemService.postItem(payload)
    return response
  }

  @Patch(':id')
  async patchItem(
    @Body() payload: any,
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const update = await this.itemService.patchItem(payload, id)
    return response.status(update.statusCode).json({
      data: update.data,
      error: update.error
    })
  }



  @Delete(':id')
  async deleteAnItem(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<Response> {
    const deleted = await this.itemService.deleteItem(id)
    return response.status(deleted.statusCode).json(deleted.data)
  }
}