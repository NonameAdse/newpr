import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimeDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('get')
  @ApiOkResponse({ type: AnimeDto })
  getAllAnime() {
    return this.animeService.getAllAnime();
  }

  @Post('create')
  @ApiCreatedResponse()
  CreateAnime(@Body() body: AnimeDto) {
    return this.animeService.CreateAnime(body);
  }
}
