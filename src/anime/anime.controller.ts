import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AnimeDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnimeService } from './anime.service';

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
    @Query('chapter', ParseIntPipe) chapter: string,
  ) {
    return this.animeService.getAnimeChapter(name, chapter);
  }

  @Get('get-by-filters')
  @ApiOkResponse({ type: [AnimeDto] })
  getAnimeByGenres(
    @Query('genres') genres: string[] = [],
    @Query('name') name: string = '',
    @Query('status') status: string = '',
    @Query('country') country: string = '',
    @Query('orderField') orderField: string = '',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
    @Query('page') page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
  ) {
    const sortOptions =
      orderField && orderDirection
        ? [{ field: orderField, order: orderDirection }]
        : [];
    return this.animeService.getAnimeByGenres(
      genres,
      name,
      status,
      country,
      sortOptions,
      page,
      perPage,
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
  @Get('user-favorite')
  @ApiOkResponse({ type: [AnimeDto] })
  getUserManga(@Query('email') email: string) {
    return this.animeService.getUserFavoriteManga(email);
  }

  @Get('rating')
  @ApiOkResponse()
  getMangaRating(
    @Query('name') name: string,
    @Query('rating', ParseIntPipe) rating: number,
  ) {
    return this.animeService.addRating(name, rating);
  }
}
