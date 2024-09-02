import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1725296530162 implements MigrationInterface {
    name = 'Initial1725296530162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "planetId" uuid, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character_episodes_episode" ("characterId" uuid NOT NULL, "episodeId" uuid NOT NULL, CONSTRAINT "PK_fa79dfbbbcf224214c002d2dc68" PRIMARY KEY ("characterId", "episodeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_beae98fb8120fa5ab25567da6a" ON "character_episodes_episode" ("characterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f73e945be228f2f8bea90ccd3d" ON "character_episodes_episode" ("episodeId") `);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_837343219e28604bda7b7a9861e" FOREIGN KEY ("planetId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character_episodes_episode" ADD CONSTRAINT "FK_beae98fb8120fa5ab25567da6ac" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "character_episodes_episode" ADD CONSTRAINT "FK_f73e945be228f2f8bea90ccd3de" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character_episodes_episode" DROP CONSTRAINT "FK_f73e945be228f2f8bea90ccd3de"`);
        await queryRunner.query(`ALTER TABLE "character_episodes_episode" DROP CONSTRAINT "FK_beae98fb8120fa5ab25567da6ac"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_837343219e28604bda7b7a9861e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f73e945be228f2f8bea90ccd3d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_beae98fb8120fa5ab25567da6a"`);
        await queryRunner.query(`DROP TABLE "character_episodes_episode"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "planet"`);
        await queryRunner.query(`DROP TABLE "episode"`);
    }

}
