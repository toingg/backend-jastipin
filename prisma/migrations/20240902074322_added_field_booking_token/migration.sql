/*
  Warnings:

  - Added the required column `booking_token` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "booking_token" TEXT NOT NULL;
