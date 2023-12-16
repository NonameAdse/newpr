import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AnimeService } from './anime/anime.service';
import { AnimeController } from './anime/anime.controller';
import { AnimeModule } from './anime/anime.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { WakeUpModule } from './wakeup/wakeup.module';

@Module({
  imports: [DbModule, AnimeModule, UserModule],
  controllers: [AppController, AnimeController, UserController],
  providers: [AppService, AnimeService, UserService, WakeUpModule],
})
export class AppModule {}
