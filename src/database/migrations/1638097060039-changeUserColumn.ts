import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUserColumn1638097060039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` RENAME COLUMN `nickName` to `userIdentifier`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` RENAME COLUMN `userIdentifier` to `nickName`',
    );
  }
}
