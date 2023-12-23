import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { MangaDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MangaService {
  constructor(
    private db: DbService,
    private user: UserService,
  ) {}

  getAllManga() {
    return this.db.anime.findMany({ include: { chapters: true } });
  }
  getMangaByName(name: string) {
    return this.db.anime.findFirst({
      where: {
        name: name,
      },
      include: { chapters: true },
    });
  }
  getMangaChapter(name: string, chapter: string) {
    const chap = Number(chapter);
    console.log(chap);
    return this.db.chapter.findFirst({
      where: {
        animeName: name,
        chapter: chap,
      },
    });
  }
  getMangaByGenres(
    genres: string[],
    name: string,
    status: string,
    country: string,
    sortOptions: { field: string; order: 'asc' | 'desc' }[],
    page: number,
    perPage: number,
  ) {
    console.log(country);
    const orderBy = Object.fromEntries(
      sortOptions.map(({ field, order }) => [field, order]),
    );
    const skip = (page - 1) * perPage;
    return this.db.anime.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        genres: { hasEvery: genres },
        status: { contains: status },
        country: { contains: country },
      },
      orderBy: orderBy,
      skip: skip,
      take: perPage,
    });
  }

  CreateManga(body: MangaDto) {
    return this.db.anime.create({
      data: {
        name: body.name,
        img: body.img,
        imgHeader: body.imgHeader,
        describe: body.describe,
        genres: body.genres,
        country: body.country,
        author: body.author,
        published: body.published,
        status: body.status,
        chapters: {
          create: body.chapters.map((chapter) => ({
            chapter: chapter.chapter,
            createdAt: new Date(),
            name: chapter.name,
            img: chapter.img,
          })),
        },
      },
    });
  }

  getMankaPopular() {
    return this.db.anime.findMany({
      take: 10,
      orderBy: { popularity: { sort: 'desc' as const } },
    });
  }

  async getUserFavorite(email: string, name: string) {
    const user = await this.user.getUserFavorite(email);

    if (!user?.favorite || user?.favorite.length === 0) {
      return null;
    }
    const favoriteList = await this.db.anime.findMany({
      where: { name: { in: user?.favorite } },
      select: { name: true },
    });

    const favoriteNames = favoriteList.map((anime) => anime.name);

    return favoriteNames.includes(name);
  }

  async getUserFavoriteManga(email: string) {
    const user = await this.user.getUserFavorite(email);

    if (!user?.favorite || user?.favorite.length === 0) {
      return [];
    }
    return this.db.anime.findMany({
      where: { name: { in: user?.favorite } },
    });
  }

  async addRating(name: string, rating: number): Promise<void> {
    const anime = await this.db.anime.findFirst({
      where: {
        name: name,
      },
    });
    if (!anime?.averageRating) {
      await this.db.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: rating,
          ratingCount: 1,
        },
      });
    } else {
      const totalRating = anime.averageRating * anime.ratingCount! + rating;
      const newRatingCount = anime.ratingCount! + 1;
      const newAverageRating = totalRating / newRatingCount;

      await this.db.anime.update({
        where: {
          name: name,
        },
        data: {
          averageRating: newAverageRating,
          ratingCount: newRatingCount,
        },
      });
    }
  }
}
