import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

}
