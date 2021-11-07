import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { FeedbackApp, FeedbackVehicle } from '../interfaces/feedback.interface';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class FeedbackRepository {
  private className = 'FeedbackRepository';

  private databaseOfFeedbacks: string;

  constructor() {
    this.databaseOfFeedbacks = 'feedbacks';
  }

  public async registerAppFeedback(dataOfFeedback: FeedbackApp): Promise<void> {
    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender}`,
      `${this.className} - ${this.registerAppFeedback.name}`,
    );

    await db
      .collection(`${this.databaseOfFeedbacks}App`)
      .add(dataOfFeedback)
      .catch((error: any) => {
        Logger.error(
          `dataOfFeedbackBy = ${dataOfFeedback.emailSender} - error = ${error}`,
          '',
          `${this.className} - ${this.registerAppFeedback.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender} - SUCCESS`,
      `${this.className} - ${this.registerAppFeedback.name}`,
    );
  }

  public async registerVehicleFeedback(dataOfFeedback: FeedbackVehicle): Promise<void> {
    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender}`,
      `${this.className} - ${this.registerVehicleFeedback.name}`,
    );

    await db
      .collection(`${this.databaseOfFeedbacks}Vehicle`)
      .add(dataOfFeedback)
      .catch((error: any) => {
        Logger.error(
          `dataOfFeedbackBy = ${dataOfFeedback.emailSender} - error = ${error}`,
          '',
          `${this.className} - ${this.registerVehicleFeedback.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `dataOfFeedbackBy = ${dataOfFeedback.emailSender} - SUCCESS`,
      `${this.className} - ${this.registerVehicleFeedback.name}`,
    );
  }
}
