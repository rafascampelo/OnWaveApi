/*
  Warnings:

  - You are about to drop the `barberShop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `stock` on the `produts` table. All the data in the column will be lost.
  - Added the required column `barbershopId` to the `produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `stockMovements` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "barberShop";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "barbershop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "unitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Stocks_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" REAL,
    "price" REAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "barberShopId" TEXT NOT NULL,
    CONSTRAINT "process_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barbershop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "process_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "processTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "process_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_process" ("barberShopId", "categoryId", "cost", "id", "name", "price", "typeId") SELECT "barberShopId", "categoryId", "cost", "id", "name", "price", "typeId" FROM "process";
DROP TABLE "process";
ALTER TABLE "new_process" RENAME TO "process";
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
    "WorkTop" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "produts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produts_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produts" ("WorkTop", "cost", "describe", "id", "img", "name", "nameWeight", "price", "userId", "weight") SELECT "WorkTop", "cost", "describe", "id", "img", "name", "nameWeight", "price", "userId", "weight" FROM "produts";
DROP TABLE "produts";
ALTER TABLE "new_produts" RENAME TO "produts";
CREATE TABLE "new_stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "describe" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stockMovements" ("date", "describe", "id", "productId", "quantity", "type", "userId") SELECT "date", "describe", "id", "productId", "quantity", "type", "userId" FROM "stockMovements";
DROP TABLE "stockMovements";
ALTER TABLE "new_stockMovements" RENAME TO "stockMovements";
CREATE TABLE "new_units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "units_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "units_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_units" ("addressId", "barbershopId", "id", "name") SELECT "addressId", "barbershopId", "id", "name" FROM "units";
DROP TABLE "units";
ALTER TABLE "new_units" RENAME TO "units";
CREATE UNIQUE INDEX "units_addressId_key" ON "units"("addressId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "born" TEXT NOT NULL DEFAULT '0',
    "cpf" TEXT NOT NULL DEFAULT '0',
    "cellphone" TEXT NOT NULL DEFAULT '0',
    "role" TEXT NOT NULL,
    "unitId" TEXT NOT NULL DEFAULT '0',
    "adminId" TEXT,
    "barbeshopId" TEXT NOT NULL DEFAULT '0',
    CONSTRAINT "users_barbeshopId_fkey" FOREIGN KEY ("barbeshopId") REFERENCES "barbershop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("adminId", "born", "cellphone", "cpf", "email", "firstName", "id", "lastName", "password", "role", "unitId") SELECT "adminId", "born", "cellphone", "cpf", "email", "firstName", "id", "lastName", "password", "role", "unitId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_unitId_key" ON "Stocks"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_productId_key" ON "Stocks"("productId");
