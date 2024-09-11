/*
  Warnings:

  - You are about to drop the column `nameType` on the `processTypes` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `produts` table. All the data in the column will be lost.
  - You are about to drop the column `nameProduct` on the `produts` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `units` table. All the data in the column will be lost.
  - Added the required column `role` to the `devs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `processTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "complement" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_devs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_devs" ("email", "firstName", "id", "lastName", "password") SELECT "email", "firstName", "id", "lastName", "password" FROM "devs";
DROP TABLE "devs";
ALTER TABLE "new_devs" RENAME TO "devs";
CREATE UNIQUE INDEX "devs_email_key" ON "devs"("email");
CREATE TABLE "new_processTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_processTypes" ("id") SELECT "id" FROM "processTypes";
DROP TABLE "processTypes";
ALTER TABLE "new_processTypes" RENAME TO "processTypes";
CREATE TABLE "new_produts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "nameWeight" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "img" TEXT,
    "describe" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "WorkTop" TEXT NOT NULL,
    CONSTRAINT "produts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produts" ("WorkTop", "cost", "describe", "id", "img", "nameWeight", "price", "stock", "userId", "weight") SELECT "WorkTop", "cost", "describe", "id", "img", "nameWeight", "price", "stock", "userId", "weight" FROM "produts";
DROP TABLE "produts";
ALTER TABLE "new_produts" RENAME TO "produts";
CREATE TABLE "new_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "units_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "units_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barberShop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_units" ("barbershopId", "id", "name") SELECT "barbershopId", "id", "name" FROM "units";
DROP TABLE "units";
ALTER TABLE "new_units" RENAME TO "units";
CREATE UNIQUE INDEX "units_addressId_key" ON "units"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
