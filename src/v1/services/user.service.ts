import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repository/user.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';

@Injectable()
export class UserService {
  private className = 'UserService';

  constructor(private readonly userRepository: UserRepository) {}

  public async getUserInfo(uid: string): Promise<User> {
    Logger.log(`uid = ${uid}`, `${this.className} - ${this.getUserInfo.name}`);

    const user = await this.userRepository.getUserByUid(uid);

    if (!user) {
      ErrorUtils.throwSpecificError(404);
    }

    return user;
  }

  public async createUser(user: User): Promise<User> {
    Logger.log(`user = ${JSON.stringify(user)}`, `${this.className} - ${this.createUser.name}`);

    const userExists = await this.userRepository.getUserByUid(user.uid);

    if (userExists && userExists.uid) {
      ErrorUtils.throwSpecificError(400);
    }

    if (user.isPassenger && user.cpf && (!user.cpf || !Utils.isCpf(user.cpf))) {
      ErrorUtils.throwSpecificError(400);
    }

    if (!user.isPassenger && (!user.cnpj || !Utils.isCnpj(user.cnpj))) {
      ErrorUtils.throwSpecificError(400);
    }

    await this.userRepository.registerUser(user.uid, user);

    return user;
  }
}
