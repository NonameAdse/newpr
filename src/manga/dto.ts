import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Chapter {
  @ApiProperty()
  chapter: number;
  @ApiProperty()
  img: string[];
  @ApiProperty()
  createdAt: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  animeName: string;
}

export class MangaDto {
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
  country: string;
  @ApiProperty()
  published: number;
  @ApiProperty()
  averageRating: number;
  @ApiProperty()
  ratingCount: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  id: number;

  @ApiProperty({ type: [Chapter] })
  @IsOptional()
  chapters: Chapter[];
}

export class MangaBodyDto {
  genres?: string[];
  name?: string;
  status?: string;
  orderField?: string;
  orderDirection?: 'asc' | 'desc';
}
