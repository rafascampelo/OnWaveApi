/*
  Warnings:

  - You are about to drop the `devs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "devs_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "devs";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("born", "cellphone", "cpf", "email", "firstName", "id", "lastName", "password", "role", "unitId") SELECT "born", "cellphone", "cpf", "email", "firstName", "id", "lastName", "password", "role", "unitId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
