import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreationDate1725304829651 implements MigrationInterface {
    name = 'AddCreationDate1725304829651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episode" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "planet" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "character" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_c4aad2f1458c36ca378f523c75" ON "episode" ("creationDate") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb58fcdc79c292173f2804fb42" ON "planet" ("creationDate") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc0fc770205df5afd341c2b23f" ON "character" ("creationDate") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_fc0fc770205df5afd341c2b23f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb58fcdc79c292173f2804fb42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4aad2f1458c36ca378f523c75"`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "planet" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "episode" DROP COLUMN "creationDate"`);
    }

}
