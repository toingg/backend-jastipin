/*
  Warnings:

  - Added the required column `passenger` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "passenger" TEXT NOT NULL,
ADD COLUMN     "validation_admin" BOOLEAN NOT NULL DEFAULT false;
