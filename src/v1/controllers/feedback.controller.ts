import { Controller, Logger, Post, Body, ValidationPipe } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackAppValidator } from '../validators/feedbackApp.validator';

@Controller('/feedback')
export class FeedbackController {
  private className = 'FeedbackController';

  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/app')
  public appFeedback(@Body(new ValidationPipe()) body: FeedbackAppValidator) {
    Logger.log(`body = ${JSON.stringify(body)}`, `${this.className} - ${this.appFeedback.name}`);

    return this.feedbackService.registerAppFeedback(body);
  }
}
