import { MigrationInterface, QueryRunner } from 'typeorm';

export class bgColorNullable1638599212449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE name_card MODIFY COLUMN bgColorId int',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE name_card MODIFY COLUMN bgColorId int not null',
    );
  }
}
