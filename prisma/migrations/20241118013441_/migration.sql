/*
  Warnings:

  - You are about to drop the column `born` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "fixedPayment" REAL,
    "commissionProduct" REAL,
    "commissionProcedure" REAL,
    "firstLogin" BOOLEAN NOT NULL DEFAULT true,
    "adminId" TEXT,
    "barbershopId" TEXT,
    CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("adminId", "barbershopId", "cellphone", "commissionProcedure", "commissionProduct", "email", "firstLogin", "firstname", "fixedPayment", "id", "lastname", "password", "role") SELECT "adminId", "barbershopId", "cellphone", "commissionProcedure", "commissionProduct", "email", "firstLogin", "firstname", "fixedPayment", "id", "lastname", "password", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
