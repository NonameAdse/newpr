import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MangaService } from './manga.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({ imports: [DbModule, UserModule], providers: [MangaService] })
export class MangaModule {}
