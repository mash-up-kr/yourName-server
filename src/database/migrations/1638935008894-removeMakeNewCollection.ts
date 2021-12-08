import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeMakeNewCollection1638935008894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` DROP `makeNewCollection`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` ADD `makeNewCollection`',
    );
  }
}
