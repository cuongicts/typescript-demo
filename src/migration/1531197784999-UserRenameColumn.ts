import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRenameColumn1531197784999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user_entity CHANGE username name varchar(50)');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE user_entity CHANGE name username varchar(50)');
    }

}
