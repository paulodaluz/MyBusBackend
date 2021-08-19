import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CacheRepository } from '../repository/cache.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(
    private readonly cacheRepository: CacheRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createUser(user: User): Promise<User> {
    Logger.log(`user = ${JSON.stringify(user)}`, `${this.className} - ${this.createUser.name}`);

    await this.userRepository.registerUser(user.uid, user);

    return user;
  }
}
