-- CreateTable
CREATE TABLE "Anime" (
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "imgHeader" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "genres" TEXT[],
    "author" TEXT NOT NULL,
    "published" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chapter" (
    "chapter" INTEGER NOT NULL,
    "img" TEXT[],
    "name" TEXT NOT NULL,
    "animeName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_name_key" ON "Anime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_name_key" ON "Chapter"("name");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_animeName_fkey" FOREIGN KEY ("animeName") REFERENCES "Anime"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
