/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "gyms_email_key" ON "gyms"("email");
