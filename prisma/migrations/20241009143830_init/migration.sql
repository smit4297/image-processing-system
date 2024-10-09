-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "inputUrls" TEXT[],
    "outputUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessingRequest" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessingRequest_pkey" PRIMARY KEY ("id")
);
