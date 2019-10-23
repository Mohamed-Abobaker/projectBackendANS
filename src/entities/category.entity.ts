import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  name: string;

}
