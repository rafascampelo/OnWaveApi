-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_productsToServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "productsToServices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "productsToServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_productsToServices" ("id", "productId", "serviceId") SELECT "id", "productId", "serviceId" FROM "productsToServices";
DROP TABLE "productsToServices";
ALTER TABLE "new_productsToServices" RENAME TO "productsToServices";
CREATE TABLE "new_stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movementType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "stockMovements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_stockMovements" ("date", "description", "id", "movementType", "productId", "quantity", "userId") SELECT "date", "description", "id", "movementType", "productId", "quantity", "userId" FROM "stockMovements";
DROP TABLE "stockMovements";
ALTER TABLE "new_stockMovements" RENAME TO "stockMovements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
