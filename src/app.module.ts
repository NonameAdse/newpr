import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { MangaService } from './manga/manga.service';
import { MangaController } from './manga/manga.controller';
import { MangaModule } from './manga/manga.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { WakeUpModule } from './wakeup/wakeup.module';

@Module({
  imports: [DbModule, MangaModule, UserModule, WakeUpModule],
  controllers: [AppController, MangaController, UserController],
  providers: [AppService, MangaService, UserService],
})
export class AppModule {}
