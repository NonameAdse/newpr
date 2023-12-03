import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { clearScreenDown } from 'readline';

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

export class AnimeNameQueryDto {
  @ApiProperty({ required: false })
  // @IsOptional()
  name?: string;
}
export class AnimeGenresQueryDto {
  @ApiProperty({ required: false })
  // @IsOptional()
  genres?: string[];
}
