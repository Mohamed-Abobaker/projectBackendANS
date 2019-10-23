import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  priority: string;

  @Column('text')
  image: string;
}