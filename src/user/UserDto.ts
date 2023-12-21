import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
}

export class ToggleAnimeFavoriteDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}

