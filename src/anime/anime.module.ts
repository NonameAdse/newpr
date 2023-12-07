import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AnimeService } from './anime.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({ imports: [DbModule, UserModule], providers: [AnimeService] })
export class AnimeModule {}
