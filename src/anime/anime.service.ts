import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AnimeDto } from './dto';

@Injectable()
export class AnimeService {
  constructor(private db: DbService) {}

  getAllAnime() {
    return this.db.anime.findMany();
  }

  async CreateAnime(body: AnimeDto) {
    const anime = await this.db.anime.create({
      data: {
        name: body.name,
        img: body.img,
        imgHeader: body.imgHeader,
        describe: body.describe,
        genres: body.genres,
        author: body.author,
        published: body.published,
        status: body.status,
      },
    });

    const chapters = await this.db.chapter.createMany({
      data: body.chapters.map((chapter) => ({
        animeName: chapter.animeName,
        chapter: chapter.chapter,
        name: chapter.name,
        img: chapter.img,
      })),
    });
    return { anime, chapters };
  }
}
