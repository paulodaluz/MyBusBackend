import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { User } from '../interfaces/user.interface';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class UserRepository {
  private className = 'UserRepository';

  private databaseOfUsers: string;

  constructor() {
    this.databaseOfUsers = 'users';
  }

  public async registerUser(uid: string, user: User): Promise<void> {
    Logger.log(`uid = ${uid} - user = ${user}`, `${this.className} - ${this.registerUser.name}`);

    await db
      .collection(this.databaseOfUsers)
      .doc(uid)
      .set(user)
      .catch((error: any) => {
        Logger.error(
          `uid = ${uid} - error = ${error}`,
          '',
          `${this.className} - ${this.registerUser.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uid = ${uid} - SUCCESS`, `${this.className} - ${this.registerUser.name}`);
  }

  public async getUserByUid(uid: string): Promise<User> {
    Logger.log(`uid = ${uid}`, `${this.className} - ${this.getUserByUid.name}`);

    const user = await db
      .collection(this.databaseOfUsers)
      .doc(uid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uid = ${uid} - error = ${error}`,
          '',
          `${this.className} - ${this.getUserByUid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uid = ${uid} - SUCCESS`, `${this.className} - ${this.getUserByUid.name}`);

    return user.data();
  }
}
