import { Controller, Get, Post, Body, Req, Res, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service'
import { CategoryEntity } from 'src/entities/category.entity';
import { Request, Response } from 'express';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, ) { }

  @Get()
  async getCategories(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const categories = await this.categoryService.getCategories()
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
    const category = await this.categoryService.getSingleCategory(id);
    return response.status(category.statusCode).json({
      data: category.data,
      error: category.error
    })
  }


  @Post()
  async addCategory(
    @Body() payload: any,
    @Res() response: Response
  ): Promise<any> {
    try {
      return await this.categoryService.addCategory(payload)
    }
    catch (error) {
      return response.status(405).json({
        error: {
          message: error.message
        }
      })
    }
  }


  @Delete(':id')
  async deleteCategory(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: 'uuid'
  ): Promise<any> {
    const deleted = await this.categoryService.deleteCategory(id);
    return response.status(deleted.statusCode).json(deleted.data)
  }
}