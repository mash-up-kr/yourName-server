import { MigrationInterface, QueryRunner } from 'typeorm';

export class UrlToKey1634020287129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `image` RENAME COLUMN `url` to `key`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `image` RENAME COLUMN `key` to `url`');
  }
}
