import {MigrationInterface, QueryRunner} from "typeorm";

export class onboardingShareMyNameCardField1638410038165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `user_onboarding` DROP `shareMyNameCard`');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `user_onboarding` ADD `shareMyNameCard`');
    }

}
