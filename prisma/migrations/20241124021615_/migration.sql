/*
  Warnings:

  - Added the required column `userId` to the `stockMovements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movementType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "stockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stockMovements" ("date", "description", "id", "movementType", "productId", "quantity") SELECT "date", "description", "id", "movementType", "productId", "quantity" FROM "stockMovements";
DROP TABLE "stockMovements";
ALTER TABLE "new_stockMovements" RENAME TO "stockMovements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
