import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1534394409048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user_entity` DROP COLUMN `name`');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user_entity` ADD `name` varchar(50) NULL');
    }

}
