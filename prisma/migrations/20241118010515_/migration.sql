/*
  Warnings:

  - You are about to alter the column `born` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

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
    "born" DATETIME NOT NULL,
    "cpf" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "fixedPayment" REAL,
    "comissionProduct" REAL,
    "comissionProcedure" REAL,
    "firstLogin" BOOLEAN NOT NULL DEFAULT true,
    "adminId" TEXT,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("adminId", "barbershopId", "born", "cellphone", "comissionProcedure", "comissionProduct", "cpf", "email", "firstLogin", "firstname", "fixedPayment", "id", "lastname", "password", "role") SELECT "adminId", "barbershopId", "born", "cellphone", "comissionProcedure", "comissionProduct", "cpf", "email", "firstLogin", "firstname", "fixedPayment", "id", "lastname", "password", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
