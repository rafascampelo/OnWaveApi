/*
  Warnings:

  - You are about to drop the column `barberShopId` on the `procedures` table. All the data in the column will be lost.
  - Added the required column `barbershopId` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "describe" TEXT,
    CONSTRAINT "procedures_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "procedures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_procedures" ("categoryId", "cost", "describe", "id", "name", "price") SELECT "categoryId", "cost", "describe", "id", "name", "price" FROM "procedures";
DROP TABLE "procedures";
ALTER TABLE "new_procedures" RENAME TO "procedures";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
