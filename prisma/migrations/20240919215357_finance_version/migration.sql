/*
  Warnings:

  - You are about to drop the `CashMovements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashRegisters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `quantity` on the `stockMovements` table. All the data in the column will be lost.
  - Added the required column `unitId` to the `fixedExpenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `stockMovements` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CashRegisters_unitId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CashMovements";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CashRegisters";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cashRegisters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "cash" REAL NOT NULL,
    CONSTRAINT "cashRegisters_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cashMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cashRegisterId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cashMovements_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "cashRegisters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monthly_balance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalRevenue" REAL NOT NULL,
    "fixedCost" REAL NOT NULL,
    "variableCost" REAL NOT NULL,
    "totalProfit" REAL NOT NULL,
    CONSTRAINT "monthly_balance_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fixedExpenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "unitId" TEXT NOT NULL,
    CONSTRAINT "fixedExpenses_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_fixedExpenses" ("date", "icon", "id", "name", "price") SELECT "date", "icon", "id", "name", "price" FROM "fixedExpenses";
DROP TABLE "fixedExpenses";
ALTER TABLE "new_fixedExpenses" RENAME TO "fixedExpenses";
CREATE TABLE "new_stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "describe" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stockMovements" ("date", "describe", "id", "productId", "type", "unitId", "userId") SELECT "date", "describe", "id", "productId", "type", "unitId", "userId" FROM "stockMovements";
DROP TABLE "stockMovements";
ALTER TABLE "new_stockMovements" RENAME TO "stockMovements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "cashRegisters_unitId_key" ON "cashRegisters"("unitId");
