import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Chapter {
  @ApiProperty()
  chapter: number;
  @ApiProperty()
  img: string[];
  @ApiProperty()
  name: string;
  @ApiProperty()
  animeName: string;
}

export class AnimeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  imgHeader: string;
  @ApiProperty()
  describe: string;
  @ApiProperty()
  genres: string[];
  @ApiProperty()
  author: string;
  @ApiProperty()
  published: string;
  @ApiProperty()
  status: string;

  @ApiProperty({ type: [Chapter] })
  @IsOptional()
  chapters: Chapter[];
}

export class AnimeBodyDto {
  genres?: string[];
  name?: string;
  status?: string;
  orderField?: string;
  orderDirection?: 'asc' | 'desc';
}
