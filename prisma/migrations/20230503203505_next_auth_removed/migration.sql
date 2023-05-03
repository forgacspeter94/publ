/*
  Warnings:

  - You are about to drop the column `userId` on the `UrlRedirects` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userEmail` to the `UrlRedirects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UrlRedirects" DROP CONSTRAINT "UrlRedirects_userId_fkey";

-- AlterTable
ALTER TABLE "UrlRedirects" DROP COLUMN "userId";
ALTER TABLE "UrlRedirects" ADD COLUMN     "userEmail" STRING NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationRequest";
