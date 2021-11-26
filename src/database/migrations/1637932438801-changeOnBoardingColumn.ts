import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeOnBoardingColumn1637932438801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `shareNameCard` to `shareMyNameCard`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `addNameCollectionNameCard` to `addFriendNameCard`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `makeCollection` to `makeNewCollection`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `makeNamCards` to `makeThreeNameCards`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `shareMyNameCard` to `shareNameCard`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `addFriendNameCard` to `addNameCollectionNameCard`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `makeNewCollection` to `makeCollection`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` RENAME COLUMN `makeThreeNameCards` to `makeNamCards`',
    );
  }
}
