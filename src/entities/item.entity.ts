import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  image: string;

  @Column('text')
  category: string
}