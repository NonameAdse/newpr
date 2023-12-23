/*
  Warnings:

  - Added the required column `country` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `published` on the `Anime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "popularity" INTEGER DEFAULT 0,
ADD COLUMN     "ratingCount" INTEGER DEFAULT 0,
ALTER COLUMN "author" DROP NOT NULL,
DROP COLUMN "published",
ADD COLUMN     "published" INTEGER NOT NULL,
ADD CONSTRAINT "Anime_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "favorite" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
