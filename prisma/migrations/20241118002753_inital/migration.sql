-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "born" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "barbershops" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "barbershops_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "nameWeight" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "describe" TEXT,
    "workTop" BOOLEAN NOT NULL,
    "stock" INTEGER NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "products_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stockMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movementType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "productId" TEXT NOT NULL,
    CONSTRAINT "stockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barberShopId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "procedures_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "procedures_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cashRegisters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cash" REAL NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "cashRegisters_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cashMovements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cashRegisterId" TEXT NOT NULL,
    CONSTRAINT "cashMovements_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "cashRegisters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fixedExpenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "fixedExpenses_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monthlyBalance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalRevenue" REAL NOT NULL,
    "fixedCost" REAL NOT NULL,
    "variableCost" REAL NOT NULL,
    "totalProfit" REAL NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "monthlyBalance_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "proceduresToServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "procedureId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "proceduresToServices_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proceduresToServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "productsToServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "productsToServices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "productsToServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "services_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "serviceCommissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productCommission" REAL NOT NULL,
    "procedureCommission" REAL NOT NULL,
    "totalCommission" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "serviceCommissions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "serviceCommissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "cashRegisters_barbershopId_key" ON "cashRegisters"("barbershopId");
