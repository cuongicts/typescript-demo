import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserUpdating1541197012228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user_entity ADD username varchar(50) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user_entity DROP COLUMN username');
    }

}
