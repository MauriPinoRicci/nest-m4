import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCreatedAtUser1729363965115 implements MigrationInterface {
    name = 'RemoveCreatedAtUser1729363965115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "description" text NOT NULL, "price" decimal(10,2) NOT NULL, "publicId" varchar, "stock" integer NOT NULL, "imgUrl" text, "categoryId" varchar)`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(10,2) NOT NULL, "orderId" varchar)`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "userId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(80) NOT NULL, "email" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "phone" varchar(15), "country" varchar(50), "address" text, "city" varchar(50), "admin" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_order_details" ("productsId" varchar NOT NULL, "orderDetailsId" varchar NOT NULL, PRIMARY KEY ("productsId", "orderDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce" ON "products_order_details_order_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d01089028de42dd7afc853101b" ON "products_order_details_order_details" ("orderDetailsId") `);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "description" text NOT NULL, "price" decimal(10,2) NOT NULL, "publicId" varchar, "stock" integer NOT NULL, "imgUrl" text, "categoryId" varchar, CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "description", "price", "publicId", "stock", "imgUrl", "categoryId") SELECT "id", "name", "description", "price", "publicId", "stock", "imgUrl", "categoryId" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_order_details" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(10,2) NOT NULL, "orderId" varchar, CONSTRAINT "FK_147bc15de4304f89a93c7eee969" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order_details"("id", "price", "orderId") SELECT "id", "price", "orderId" FROM "order_details"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`ALTER TABLE "temporary_order_details" RENAME TO "order_details"`);
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "userId" varchar NOT NULL, CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "date", "userId") SELECT "id", "date", "userId" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
        await queryRunner.query(`DROP INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce"`);
        await queryRunner.query(`DROP INDEX "IDX_d01089028de42dd7afc853101b"`);
        await queryRunner.query(`CREATE TABLE "temporary_products_order_details_order_details" ("productsId" varchar NOT NULL, "orderDetailsId" varchar NOT NULL, CONSTRAINT "FK_f6e6c7ee1d7f3a557ba8f599ced" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d01089028de42dd7afc853101bb" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("productsId", "orderDetailsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_products_order_details_order_details"("productsId", "orderDetailsId") SELECT "productsId", "orderDetailsId" FROM "products_order_details_order_details"`);
        await queryRunner.query(`DROP TABLE "products_order_details_order_details"`);
        await queryRunner.query(`ALTER TABLE "temporary_products_order_details_order_details" RENAME TO "products_order_details_order_details"`);
        await queryRunner.query(`CREATE INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce" ON "products_order_details_order_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d01089028de42dd7afc853101b" ON "products_order_details_order_details" ("orderDetailsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d01089028de42dd7afc853101b"`);
        await queryRunner.query(`DROP INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_details" RENAME TO "temporary_products_order_details_order_details"`);
        await queryRunner.query(`CREATE TABLE "products_order_details_order_details" ("productsId" varchar NOT NULL, "orderDetailsId" varchar NOT NULL, PRIMARY KEY ("productsId", "orderDetailsId"))`);
        await queryRunner.query(`INSERT INTO "products_order_details_order_details"("productsId", "orderDetailsId") SELECT "productsId", "orderDetailsId" FROM "temporary_products_order_details_order_details"`);
        await queryRunner.query(`DROP TABLE "temporary_products_order_details_order_details"`);
        await queryRunner.query(`CREATE INDEX "IDX_d01089028de42dd7afc853101b" ON "products_order_details_order_details" ("orderDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce" ON "products_order_details_order_details" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "date" datetime NOT NULL, "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "orders"("id", "date", "userId") SELECT "id", "date", "userId" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
        await queryRunner.query(`ALTER TABLE "order_details" RENAME TO "temporary_order_details"`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" varchar PRIMARY KEY NOT NULL, "price" decimal(10,2) NOT NULL, "orderId" varchar)`);
        await queryRunner.query(`INSERT INTO "order_details"("id", "price", "orderId") SELECT "id", "price", "orderId" FROM "temporary_order_details"`);
        await queryRunner.query(`DROP TABLE "temporary_order_details"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "description" text NOT NULL, "price" decimal(10,2) NOT NULL, "publicId" varchar, "stock" integer NOT NULL, "imgUrl" text, "categoryId" varchar)`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "description", "price", "publicId", "stock", "imgUrl", "categoryId") SELECT "id", "name", "description", "price", "publicId", "stock", "imgUrl", "categoryId" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP INDEX "IDX_d01089028de42dd7afc853101b"`);
        await queryRunner.query(`DROP INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce"`);
        await queryRunner.query(`DROP TABLE "products_order_details_order_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
