import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AnimeService } from './anime.service';

@Module({ imports: [DbModule], providers: [AnimeService] })
export class AnimeModule {}
