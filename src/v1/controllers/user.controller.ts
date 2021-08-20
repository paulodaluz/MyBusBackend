import { Body, Controller, Post, ValidationPipe, Logger, Param, Get } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { RegisterUserValidator } from '../validators/user.validator';

@Controller('/user')
export class UserController {
  private className = 'UserController';

  constructor(private readonly userService: UserService) {}

  @Get('/get-user-info/:identifier')
  public getUserInfos(@Param('identifier') identifier: string): Promise<User> {
    Logger.log(`identifier = ${identifier}`, `${this.className} - ${this.getUserInfos.name}`);

    return this.userService.getUserInfo(identifier);
  }

  @Post('/register-user')
  public registerUser(@Body(new ValidationPipe()) body: RegisterUserValidator): Promise<User> {
    Logger.log(`body = ${JSON.stringify(body)}`, `${this.className} - registerUser`);

    return this.userService.createUser(body);
  }
}
