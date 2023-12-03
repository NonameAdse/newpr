import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AnimeDto } from './dto';

@Injectable()
export class AnimeService {
  constructor(private db: DbService) {}

  getAllAnime() {
    return this.db.anime.findMany();
  }
  getAnimeByName(name: string) {
    return this.db.anime.findUnique({
      where: {
        name: name,
      },
      include: { chapters: true },
    });
  }

  getAnimeByGenres(genres: string[], name: string, status: string) {
    return this.db.anime.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        genres: { hasEvery: genres },
        status: { contains: status },
        
      },
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
}
