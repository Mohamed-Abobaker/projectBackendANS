import { Controller, Get, Post, Body, Req, Res, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service'
import { CategoryEntity } from 'src/entities/category.entity';
import { Request, Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, ) { }

  @Delete(':id')
  async deleteCategory(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: 'uuid'
  ): Promise<any> {
    const deleted = await this.categoryService.deleteCategory(id);
    return response.status(deleted.statusCode).json(deleted.data)
  }

  @Post()
  async addCategory(
    @Body() payload: any
  ): Promise<CategoryEntity> {
    return await this.categoryService.addCategory(payload)
  }

  @Get()
  async getCategories(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<Response> {

    try {

      console.log(request.params);

      const categories = await this.categoryService.getCategories()
      return response
        .status(200)
        .json({
          data: categories,
          error: null
        });
    }
    catch (error) {
      return response
        .status(501)
        .json({
          data: null,
          error: {
            message: error.message,
            code: error.code
          }
        });
    }
  }
}