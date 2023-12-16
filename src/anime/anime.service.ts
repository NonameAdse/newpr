import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AnimeDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AnimeService {
  constructor(
    private db: DbService,
    private user: UserService,
  ) {}

  getAllAnime() {
    return this.db.anime.findMany();
  }
  getAnimeByName(name: string) {
    return this.db.anime.findFirst({
      where: {
        name: name,
      },
      include: { chapters: true },
    });
  }

  getAnimeChapter(name: string, chapter: number) {
    console.log(name, chapter);
    return this.db.chapter.findFirst({
      where: {
        animeName: name,
        chapter: chapter,
      },
    });
  }
  getAnimeByGenres(
    genres: string[],
    name: string,
    status: string,
    sortOptions: { field: string; order: 'asc' | 'desc' }[],
  ) {
    const orderBy = Object.fromEntries(
      sortOptions.map(({ field, order }) => [field, order]),
    );
    return this.db.anime.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        genres: { hasEvery: genres },
        status: { contains: status },
      },
      orderBy: orderBy,
    });
  }

  CreateAnime(body: AnimeDto) {
    return this.db.anime.create({
      data: {
        name: body.name,
        img: body.img,
        imgHeader: body.imgHeader,
        describe: body.describe,
        genres: body.genres,
        author: body.author,
        published: body.published,
        status: body.status,
        chapters: {
          create: body.chapters.map((chapter) => ({
            chapter: chapter.chapter,
            name: chapter.name,
            img: chapter.img,
          })),
        },
      },
    });
  }
  async getUserFavorite(email: string, name: string) {
    const user = await this.user.getUserFavorite(email);

    if (!user?.favorite || user?.favorite.length === 0) {
      return [];
    }
    const favoriteList = await this.db.anime.findMany({
      where: { name: { in: user?.favorite } },
      select: { name: true },
    });

    const favoriteNames = favoriteList.map((anime) => anime.name);

    return favoriteNames.includes(name);
  }
}
