import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './UserDto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userS: UserService) {}

  @Post('checkOrCreate')
  @ApiCreatedResponse()
  regNewUser(@Body() body: UserDto) {
    return this.userS.checkOrCreate(body);
  }

  @Post('addFavorite')
  addFavorite(@Query('email') email: string, @Query('name') name: string) {
    return this.userS.toggleUserFavoriteAnime(email, name);
  }
}
