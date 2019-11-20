import { Controller, Get, Post, Body, Req, Res, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service'
import { CategoryEntity } from '../entities/category.entity';
import { Request, Response } from 'express';
import { responseObj } from './category.dto'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Get()
  async getCategories(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const categories: responseObj = await this.categoryService.getCategories()
    return response.status(categories.statusCode).json({
      data: categories.data,
      error: categories.error
    })
  }

  @Get(':id')
  async getCategory(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const category: responseObj = await this.categoryService.getSingleCategory(id);
    return response.status(category.statusCode).json({
      data: category.data,
      error: category.error
    })
  }


  @Post()
  async addCategory(
    @Body() payload: CategoryEntity,
    @Res() response: Response
  ): Promise<Response> {
    const postRequest: responseObj = await this.categoryService.addCategory(payload);
    return response.status(postRequest.statusCode).json({
      data: postRequest.data,
      error: postRequest.error
    })
  }


  @Delete(':id')
  async deleteCategory(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: 'uuid'
  ): Promise<Response> {
    const deleted: responseObj = await this.categoryService.deleteCategory(id);
    return response.status(deleted.statusCode).json({
      data: deleted.data,
      error: deleted.error
    })
  }
}