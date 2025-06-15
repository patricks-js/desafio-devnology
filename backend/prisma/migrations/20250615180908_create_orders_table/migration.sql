-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total_amount" REAL NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "orders_customer_id_idx" ON "orders"("customer_id");
