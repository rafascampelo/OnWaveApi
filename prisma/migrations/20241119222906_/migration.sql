-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "nameWeight" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL,
    "describe" TEXT,
    "workTop" BOOLEAN NOT NULL,
    "stock" INTEGER NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "products_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("barbershopId", "categoryId", "cost", "describe", "id", "name", "nameWeight", "price", "stock", "weight", "workTop") SELECT "barbershopId", "categoryId", "cost", "describe", "id", "name", "nameWeight", "price", "stock", "weight", "workTop" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
