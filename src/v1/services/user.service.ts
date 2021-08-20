import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CacheRepository } from '../repository/cache.repository';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(
    private readonly cacheRepository: CacheRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getUserInfo(uid: string): Promise<User> {
    Logger.log(`uid = ${uid}`, `${this.className} - ${this.getUserInfo.name}`);

    const userInCache = await this.cacheRepository.getFromCache(uid);

    if (userInCache) {
      return userInCache;
    }

    const user = await this.userRepository.getUserByUid(uid);

    await this.cacheRepository.saveInCache(uid, JSON.stringify(user));

    return user;
  }

  public async createUser(user: User): Promise<User> {
    Logger.log(`user = ${JSON.stringify(user)}`, `${this.className} - ${this.createUser.name}`);

    const userInCache = await this.cacheRepository.getFromCache(user.uid);

    if (userInCache) {
      ErrorUtils.throwSpecificError(400);
    }

    const userExists = await this.userRepository.getUserByUid(user.uid);

    if (userExists && userExists.uid) {
      await this.cacheRepository.saveInCache(user.uid, JSON.stringify(userExists));

      ErrorUtils.throwSpecificError(400);
    }

    await this.userRepository.registerUser(user.uid, user);

    await this.cacheRepository.saveInCache(user.uid, JSON.stringify(user));

    return user;
  }
}
