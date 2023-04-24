/*
  Warnings:

  - You are about to drop the column `urlId` on the `Visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[redirect]` on the table `UrlRedirects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `redirect` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_urlId_fkey";

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "urlId";
ALTER TABLE "Visit" ADD COLUMN     "redirect" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UrlRedirects_redirect_key" ON "UrlRedirects"("redirect");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_redirect_fkey" FOREIGN KEY ("redirect") REFERENCES "UrlRedirects"("redirect") ON DELETE RESTRICT ON UPDATE CASCADE;
