import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSaveMeetuMyAlbum1638935269952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` ADD `saveMeetuMyAlbum` VARCHAR(255) NOT NULL DEFAULT "WAIT"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_onboarding` DROP `saveMeetuMyAlbum`',
    );
  }
}
