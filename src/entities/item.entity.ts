import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  priority: string;

  @Column('text')
  image: string;

  @Column({ nullable: true })
  category: string
}