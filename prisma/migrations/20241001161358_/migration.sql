/*
  Warnings:

  - You are about to alter the column `workTop` on the `produts` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "workTop" BOOLEAN NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "produts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produts_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produts" ("barbershopId", "cost", "describe", "id", "img", "name", "nameWeight", "price", "userId", "weight", "workTop") SELECT "barbershopId", "cost", "describe", "id", "img", "name", "nameWeight", "price", "userId", "weight", "workTop" FROM "produts";
DROP TABLE "produts";
ALTER TABLE "new_produts" RENAME TO "produts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
