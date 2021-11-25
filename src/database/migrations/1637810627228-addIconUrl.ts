import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIconUrl1637810627228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `tmi` add `iconUrl` varchar(150) not null',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tmi` DROP `iconUrl`');
  }
}
