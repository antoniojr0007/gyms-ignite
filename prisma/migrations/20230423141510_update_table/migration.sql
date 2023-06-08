/*
  Warnings:

  - Made the column `email` on table `gyms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gyms" ALTER COLUMN "email" SET NOT NULL;
