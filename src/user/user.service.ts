import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ToggleAnimeFavoriteDto, UserDto } from './UserDto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getUser(email: string) {
    return this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  getUserFavorite(email: string) {
    return this.db.user.findFirst({
      where: { email: email },
      select: { favorite: true },
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

  async toggleUserFavoriteManga(email: string, name: string) {
    const user = await this.getUserFavorite(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isAnimeInFavorites = await user.favorite.includes(name);
    console.log(isAnimeInFavorites);

    if (!isAnimeInFavorites) {
      const addpopular = await this.db.anime.update({
        where: { name: name },
        data: {
          popularity: +1,
        },
      });
      return this.db.user.update({
        where: { email: email },
        data: {
          favorite: {
            push: name,
          },
        },
      });
    } else {
      return this.db.user.update({
        where: { email: email },
        data: {
          favorite: {
            set: user.favorite.filter((anime) => anime !== name),
          },
        },
      });
    }
  }
}
