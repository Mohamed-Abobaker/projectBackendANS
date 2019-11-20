import { Controller, Get, Post, Body, Delete, Param, Res, Patch } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemEntity } from '../entities/item.entity'
import { Request, Response } from 'express';
import { CreateItemDto, PatchItemDto, responseObj } from './item.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';



@Controller('items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,

    @InjectRepository(ItemEntity)
    readonly itemEntityRepo: Repository<ItemEntity>,

    @InjectRepository(CategoryEntity)
    readonly categoryEntityRepo: Repository<CategoryEntity>,
  ) { }

  @Get()
  async getAllItems(
    @Res() response: Response,
  ): Promise<Response> {
    const items: responseObj = await this.itemService.getItems()
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



  @Get('category/:id')
  async getItemsByCategory(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const itemsList = await this.itemService.getItemsByCategory(id)
    return response.status(itemsList.statusCode).json({
      data: itemsList.data,
      error: itemsList.error

    })
  }


  @Post('test')
  async post(@Body() payload: any) {
    // const newItem = new ItemEntity();
    // newItem.title = 'testing relations item side777777'
    // newItem.category = {
    //   "id": "89f5bc43-403b-4bc0-b6c9-40262d1f8939",
    //   "name": "testing relations category side",
    //   "items": []
    // }
    // await this.itemEntityRepo.manager.save(newItem)

    const items = await this.itemEntityRepo.find({ relations: ['category'] })
    const cats = await this.categoryEntityRepo.find({ relations: ['items'], where: { id: "89f5bc43-403b-4bc0-b6c9-40262d1f8939" } })

    return cats

  }

  @Post()
  async postNewItem(
    @Body() payload: CreateItemDto,
    @Res() response: Response,
  ): Promise<Response> {
    const postResponse = await this.itemService.postItem(payload)
    return response.status(postResponse.statusCode).json({
      data: postResponse.data,
      error: postResponse.error
    })
  }

  @Patch(':id')
  async patchItem(
    @Body() payload: PatchItemDto,
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
    return response.status(deleted.statusCode).json({
      data: deleted.data,
      error: deleted.error,
    })
  }
}