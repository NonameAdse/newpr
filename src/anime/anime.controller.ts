import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AnimeBodyDto, AnimeDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnimeService } from './anime.service';
import { isEmail } from 'class-validator';
import { channel } from 'diagnostics_channel';

@Controller('anime')
@ApiTags('anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('get-all')
  @ApiOkResponse({ type: [AnimeDto] })
  getAllAnime() {
    return this.animeService.getAllAnime();
  }

  @Get('get-one/')
  @ApiOkResponse({ type: AnimeDto })
  getAnimeByName(@Query('name') name: string = '') {
    return this.animeService.getAnimeByName(name);
  }

  @Get('get-chapter/')
  @ApiOkResponse({ type: AnimeDto })
  getAnimeChapter(
    @Query('name') name: string = '',
    @Query('chapter', ParseIntPipe) chapter: number,
  ) {
    return this.animeService.getAnimeChapter(name, chapter);
  }

  @Get('get-by-filters')
  @ApiOkResponse({ type: [AnimeDto] })
  getAnimeByGenres(
    @Query('genres') genres: string[] = [],
    @Query('name') name: string = '',
    @Query('status') status: string = '',
    @Query('orderField') orderField: string = '',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
  ) {
    const sortOptions =
      orderField && orderDirection
        ? [{ field: orderField, order: orderDirection }]
        : [];
    return this.animeService.getAnimeByGenres(
      genres,
      name,
      status,
      sortOptions,
    );
  }
  // @Post('get-by-filters')
  // @ApiOkResponse({ type: [AnimeDto] })
  // getAnimeByGenres(@Body() body: AnimeBodyDto) {
  //   return this.animeService.getAnimeByGenres(body);
  // }

  @Post('create')
  @ApiCreatedResponse()
  CreateAnime(@Body() body: AnimeDto) {
    return this.animeService.CreateAnime(body);
  }

  @Get('userFavorite')
  @ApiOkResponse()
  getUserFavorite(@Query('email') email: string, @Query('name') name: string) {
    return this.animeService.getUserFavorite(email!, name);
  }
}
