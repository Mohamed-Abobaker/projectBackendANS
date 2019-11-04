import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

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

  @Column({ nullable: true })
  categoryName: string

  @ManyToOne(type => CategoryEntity, category => category.items, {})
  category: CategoryEntity;
}