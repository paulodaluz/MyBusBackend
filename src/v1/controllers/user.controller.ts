import { Body, Controller, Post, ValidationPipe, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { RegisterUserValidator } from '../validators/user.validator';

@Controller('/user')
export class UserController {
  private className = 'UserController';

  constructor(private readonly userService: UserService) {}

  @Post('/register-user')
  public registerUser(@Body(new ValidationPipe()) body: RegisterUserValidator): Promise<User> {
    Logger.log(`body = ${JSON.stringify(body)}`, `${this.className} - registerUser`);

    return this.userService.createUser(body);
  }
}
