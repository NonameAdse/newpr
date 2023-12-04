import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
}
