import { IsString, IsEmail } from 'class-validator';
import { FeedbackApp } from '../interfaces/feedback.interface';

export class FeedbackAppValidator implements FeedbackApp {
  @IsString()
  @IsEmail()
  emailSender: string;

  @IsString()
  nameSender: string;

  @IsString()
  feedback: string;
}
