-- CreateEnum
CREATE TYPE "Role" AS ENUM ('client', 'traveler');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'client',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "flights" (
    "flight_id" TEXT NOT NULL,
    "traveler_id" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "departure_country" TEXT NOT NULL,
    "arrival_country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("flight_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "flights_flight_id_key" ON "flights"("flight_id");

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
