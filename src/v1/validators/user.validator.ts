import { IsString, IsBoolean, IsArray, IsEmail, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsArray()
  linkedVehicles: Array<string>;
}
