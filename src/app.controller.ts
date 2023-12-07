import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
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
    private db: DbService,
  ) {}

  @Get('/hello')
  @ApiExcludeEndpoint()
  @ApiOkResponse({ type: HelloDto })
  async getHello(): Promise<HelloDto> {
    return { message: this.appService.getHello() };
  }
}
