import { CategoryEntity } from '../entities/category.entity'
export class CreateItemDto {
  readonly title: string;
  readonly priority: string;
  readonly image: string;
  readonly description: string;
  readonly category: CategoryEntity;
}

export class PatchItemDto {
  readonly title: string;
  readonly priority: string;
  readonly image: string;
  readonly description: string;
}

export class responseObj {
  readonly statusCode: number;
  readonly data: Object;
  readonly error: Object;
}