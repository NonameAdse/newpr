import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MangaDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MangaService } from './manga.service';

@Controller('manga')
@ApiTags('manga')
export class MangaController {
  constructor(private animeService: MangaService) {}

  @Get('get-all')
  @ApiOkResponse({ type: [MangaDto] })
  getAllManga() {
    return this.animeService.getAllManga();
  }

  @Get('get-one')
  @ApiOkResponse({ type: MangaDto })
  getMangaByName(@Query('name') name: string = '') {
    return this.animeService.getMangaByName(name);
  }

  @Get('get-chapter')
  @ApiOkResponse({ type: MangaDto })
  getMangaChapter(
    @Query('name') name: string = '',
    @Query('chapter', ParseIntPipe) chapter: string,
  ) {
    return this.animeService.getMangaChapter(name, chapter);
  }

  @Get('get-popular')
  @ApiOkResponse({ type: MangaDto })
  getMankaPopular() {
    return this.animeService.getMankaPopular();
  }

  @Get('get-by-filters')
  @ApiOkResponse({ type: [MangaDto] })
  getMangaByGenres(
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
    return this.animeService.getMangaByGenres(
      genres,
      name,
      status,
      country,
      sortOptions,
      page,
      perPage,
    );
  }

  @Post('create')
  @ApiCreatedResponse()
  CreateManga(@Body() body: MangaDto) {
    return this.animeService.CreateManga(body);
  }

  @Get('userFavorite')
  @ApiOkResponse()
  getUserFavorite(@Query('email') email: string, @Query('name') name: string) {
    return this.animeService.getUserFavorite(email!, name);
  }
  @Get('user-favorite')
  @ApiOkResponse({ type: [MangaDto] })
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
