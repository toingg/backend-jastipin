-- CreateEnum
CREATE TYPE "Role" AS ENUM ('client', 'traveler');

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'client',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Flights" (
    "flightId" TEXT NOT NULL,
    "travelerId" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "departureCountry" TEXT NOT NULL,
    "arrivalCountry" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("flightId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Flights_flightId_key" ON "Flights"("flightId");

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
