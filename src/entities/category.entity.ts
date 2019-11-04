import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';


@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToMany(type => ItemEntity, item => item.category)
  items: ItemEntity[];

}
