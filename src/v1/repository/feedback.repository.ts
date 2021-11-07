import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { FeedbackApp } from '../interfaces/feedback.interface';
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
      .collection(this.databaseOfFeedbacks)
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
}
