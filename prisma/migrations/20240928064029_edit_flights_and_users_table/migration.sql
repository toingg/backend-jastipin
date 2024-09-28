/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `airline` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_ticket` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "airline" TEXT NOT NULL,
ADD COLUMN     "img_ticket" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
