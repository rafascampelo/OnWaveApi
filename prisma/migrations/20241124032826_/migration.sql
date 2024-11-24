-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barberShopId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "describe" TEXT,
    CONSTRAINT "procedures_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "procedures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_procedures" ("barberShopId", "categoryId", "cost", "describe", "id", "name", "price") SELECT "barberShopId", "categoryId", "cost", "describe", "id", "name", "price" FROM "procedures";
DROP TABLE "procedures";
ALTER TABLE "new_procedures" RENAME TO "procedures";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
