import { Module } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CategoryController } from './categories/category.controller'
import { CategoryService } from './categories/category.service'
import { CategoryEntity } from './entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      CategoryEntity
    ])
  ],
  controllers: [AppController, CatsController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule { }
