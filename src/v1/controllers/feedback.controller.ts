import { Controller, Logger, Post, Body, ValidationPipe } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackAppValidator } from '../validators/feedbackApp.validator';
import { FeedbackVehicleValidator } from '../validators/feedbackVehicle.validator';

@Controller('/feedback')
export class FeedbackController {
  private className = 'FeedbackController';

  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/app')
  public appFeedback(@Body(new ValidationPipe()) body: FeedbackAppValidator) {
    Logger.log(`body = ${JSON.stringify(body)}`, `${this.className} - ${this.appFeedback.name}`);

    return this.feedbackService.registerAppFeedback(body);
  }

  @Post('/vehicle')
  public vehicleFeedback(@Body(new ValidationPipe()) body: FeedbackVehicleValidator) {
    Logger.log(
      `body = ${JSON.stringify(body)}`,
      `${this.className} - ${this.vehicleFeedback.name}`,
    );

    return this.feedbackService.registerVehicleFeedback(body);
  }
}
