import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AnimeService } from './anime/anime.service';
import { AnimeController } from './anime/anime.controller';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [DbModule, AnimeModule],
  controllers: [AppController, AnimeController],
  providers: [AppService, AnimeService],
})
export class AppModule {}
