import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnimeDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AnimeService } from './anime.service';
import { isEmail } from 'class-validator';

@Controller('anime')
@ApiTags('anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('get-all')
  @ApiOkResponse({ type: [AnimeDto] })
  getAllAnime() {
    return this.animeService.getAllAnime();
  }

  @Get('get-one/:name')
  @ApiOkResponse({ type: AnimeDto })
  getAnimeByName(@Param('name') name: string) {
    return this.animeService.getAnimeByName(name);
  }

  @Get('get-by-filters')
  @ApiOkResponse({ type: [AnimeDto] })
  getAnimeByGenres(
    @Query('genres') genres: string[],
    @Query('name') name: string,
    @Query('status') status: string,
    @Query('orderField') orderField: string,
    @Query('orderDirection') orderDirection: 'asc' | 'desc',
  ) {
    const sortOptions =
      orderField && orderDirection
        ? [{ field: orderField, order: orderDirection }]
        : [];
    return this.animeService.getAnimeByGenres(
      genres,
      name || '',
      status || '',
      sortOptions,
    );
  }

  @Post('create')
  @ApiCreatedResponse()
  CreateAnime(@Body() body: AnimeDto) {
    return this.animeService.CreateAnime(body);
  }

  @Get('userFavorite')
  @ApiOkResponse({ type: [AnimeDto] })
  getUserFavorite(@Query('email') email: string) {
    return this.animeService.getUserFavorite(email!);
  }
}
