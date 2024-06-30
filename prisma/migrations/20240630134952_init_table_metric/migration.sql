-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('METER', 'CENTIMETER', 'INCH', 'FEET', 'YARD', 'C', 'F', 'K');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DISTANCE', 'TEMPERATURE');

-- CreateTable
CREATE TABLE "metrics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "unit" "Unit" NOT NULL,
    "type" "Type" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);
