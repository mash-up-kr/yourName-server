import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNameCardComment1649080327547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "name_card_comment" (
        "id" int NOT NULL AUTO_INCREMENT,
        "createdAt" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        "updatedAt" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        "nickname" varchar(255) NOT NULL,
        "content" varchar(255) NOT NULL,
        "isOpen" tinyint NOT NULL,
        "userId" int NOT NULL,
        "nameCardId" int NOT NULL,
        PRIMARY KEY ("id"),
        KEY "FK_5b139d1311f065b310bb804c091" ("userId"),
        KEY "FK_6cec21cde644fc8100aa1e873f5" ("nameCardId"),
        CONSTRAINT "FK_5b139d1311f065b310bb804c091" FOREIGN KEY ("userId") REFERENCES "user" ("id"),
        CONSTRAINT "FK_6cec21cde644fc8100aa1e873f5" FOREIGN KEY ("nameCardId") REFERENCES "name_card" ("id")
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `name_card_comment`;');
  }
}
