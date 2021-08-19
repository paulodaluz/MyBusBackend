import { IsString, IsBoolean, IsArray, IsEmail } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class RegisterUserValidator implements User {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsBoolean()
  isPassenger: boolean;

  @IsString()
  uid: string;

  @IsArray()
  linkedVehicles: Array<string>;
}
