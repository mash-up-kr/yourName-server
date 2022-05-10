import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnToNameCardComment1652006064895
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `erme`.`name_card` ADD `newComment` tinyint NOT NULL DEFAULT 0',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `erme`.`name_card` DROP COLUMN `newComment`',
    );
  }
}
