import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { DbService } from './db/db.service';
const prisma = new PrismaClient();

class HelloDto {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}

  @Get('/hello')
  @ApiOkResponse({ type: HelloDto })
  async getHello(): Promise<HelloDto> {
    const user = await this.dbService.anime.findMany();
    console.log(user);
    return { message: this.appService.getHello() };
  }
}
