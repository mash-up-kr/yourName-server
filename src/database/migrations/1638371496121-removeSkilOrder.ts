import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSkilOrder1638371496121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `personal_skill` DROP `order`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `personal_skill` ADD `order`');
  }
}
