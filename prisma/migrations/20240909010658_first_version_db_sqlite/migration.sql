/*
  Warnings:

  - You are about to drop the `Devs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Devs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "devs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    CONSTRAINT "users_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nameProduct" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "nameWeight" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "img" TEXT,
    "describe" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "WorkTop" TEXT NOT NULL,
    CONSTRAINT "produts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" REAL,
    "price" REAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "barberShopId" TEXT NOT NULL,
    CONSTRAINT "process_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barberShop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "process_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "processTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "process_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "productsToProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "processId" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    CONSTRAINT "productsToProcess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "productsToProcess_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "processTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "describe" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "barberShop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "units_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barberShop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "processToServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servicesId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    CONSTRAINT "processToServices_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "processToServices_processId_fkey" FOREIGN KEY ("processId") REFERENCES "process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "productsToServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servicesId" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    CONSTRAINT "productsToServices_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "productsToServices_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Commissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commissions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CashRegisters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "cash" REAL NOT NULL,
    CONSTRAINT "CashRegisters_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CashMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cashRegisterId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CashMovements_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "CashRegisters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "devs_email_key" ON "devs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "CashRegisters_unitId_key" ON "CashRegisters"("unitId");
