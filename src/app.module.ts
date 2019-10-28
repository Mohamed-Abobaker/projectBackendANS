import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CategoryController } from './categories/category.controller'
import { CategoryService } from './categories/category.service'
import { CategoryEntity } from './entities/category.entity'
import { ItemController } from './items/item.controller'
import { ItemService } from './items/item.service'
import { ItemEntity } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      CategoryEntity,
      ItemEntity
    ])
  ],
  controllers: [AppController, CategoryController, ItemController],
  providers: [AppService, CategoryService, ItemService],
})
export class AppModule { }
