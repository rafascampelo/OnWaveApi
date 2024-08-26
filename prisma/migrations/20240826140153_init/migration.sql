-- CreateTable
CREATE TABLE "Devs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Devs_email_key" ON "Devs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cellphone_key" ON "Users"("cellphone");
