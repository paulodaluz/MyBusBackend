import { Injectable, Logger } from '@nestjs/common';
import { FeedbackApp, FeedbackVehicle } from '../interfaces/feedback.interface';
import { FeedbackRepository } from '../repository/feedback.repository';

@Injectable()
export class FeedbackService {
  private className = 'FeedbackService';

  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  public async registerAppFeedback(dataOfFeedback: FeedbackApp): Promise<string> {
    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender}`,
      `${this.className} - ${this.registerAppFeedback.name}`,
    );

    await this.feedbackRepository.registerAppFeedback(dataOfFeedback);

    return 'Feedback registered with successful!';
  }

  public async registerVehicleFeedback(dataOfFeedback: FeedbackVehicle): Promise<string> {
    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender}`,
      `${this.className} - ${this.registerVehicleFeedback.name}`,
    );

    await this.feedbackRepository.registerVehicleFeedback(dataOfFeedback);

    return 'Feedback registered with successful!';
  }
}
