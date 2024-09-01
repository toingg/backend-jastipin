/*
  Warnings:

  - You are about to drop the column `arrival_id` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departure_id` on the `flights` table. All the data in the column will be lost.
  - Added the required column `arrival_airport` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_country` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_airport` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_country` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "arrival_id",
DROP COLUMN "departure_id",
ADD COLUMN     "arrival_airport" TEXT NOT NULL,
ADD COLUMN     "arrival_country" TEXT NOT NULL,
ADD COLUMN     "departure_airport" TEXT NOT NULL,
ADD COLUMN     "departure_country" TEXT NOT NULL;
