/*
  Warnings:

  - You are about to drop the column `arrival_country` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `departure_country` on the `flights` table. All the data in the column will be lost.
  - Added the required column `arrival_date` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_id` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_date` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_id` to the `flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "arrival_country",
DROP COLUMN "departure_country",
ADD COLUMN     "arrival_date" TEXT NOT NULL,
ADD COLUMN     "arrival_id" TEXT NOT NULL,
ADD COLUMN     "departure_date" TEXT NOT NULL,
ADD COLUMN     "departure_id" TEXT NOT NULL;
