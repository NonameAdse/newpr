import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDto } from './UserDto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getUser(email) {
    return this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async checkOrCreate(body: UserDto) {
    const user = await this.getUser(body.email);

    if (!user) {
      return this.db.user.create({ data: body });
    } else {
      return 'already created';
    }
  }
}
