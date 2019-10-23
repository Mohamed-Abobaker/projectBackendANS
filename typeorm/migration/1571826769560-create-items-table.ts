import {MigrationInterface, QueryRunner} from "typeorm";

export class createItemsTable1571826769560 implements MigrationInterface {
    name = 'createItemsTable1571826769560'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "priority" text NOT NULL, "image" text NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "items"`, undefined);
    }

}
