import {MigrationInterface, QueryRunner} from "typeorm";

export class createCategoriesTable1571755196080 implements MigrationInterface {
    name = 'createCategoriesTable1571755196080'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
    }

}
