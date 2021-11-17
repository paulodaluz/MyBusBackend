import { IsString, IsEmail } from 'class-validator';
import { FeedbackVehicle } from '../interfaces/feedback.interface';

export class FeedbackVehicleValidator implements FeedbackVehicle {
  @IsString()
  @IsEmail()
  emailSender: string;

  @IsString()
  nameSender: string;

  @IsString()
  vehicleName: string;

  @IsString()
  vehicleRegistrationPlate: string;

  @IsString()
  feedback: string;
}
