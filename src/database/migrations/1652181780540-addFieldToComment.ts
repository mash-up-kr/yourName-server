import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldToComment1652181780540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `erme`.`name_card_comment` ADD `bgColor` char(7) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `erme`.`name_card_comment` DROP COLUMN `bgColor`',
    );
  }
}
