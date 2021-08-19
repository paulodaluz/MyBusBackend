import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  private className = 'UserRepository';

  private databaseOfUsers: string;

  constructor() {
    this.databaseOfUsers = 'users';
  }

  public async registerUser(uid: string, user: User): Promise<void> {
    Logger.log(`uid = ${uid} - user = ${user}`, `${this.className} - registerUser`);

    await db
      .collection(this.databaseOfUsers)
      .doc(uid)
      .set(user)
      .catch((error: any) => {
        Logger.error(`uid = ${uid} - error = ${error}`, '', `${this.className}] - [registerUser`);

        throw error;
      });

    Logger.log(`uid = ${uid} - SUCCESS`, `${this.className} - registerUser`);
  }
}
