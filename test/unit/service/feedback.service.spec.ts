import { FeedbackRepository } from '../../../src/v1/repository/feedback.repository';
import { FeedbackService } from '../../../src/v1/services/feedback.service';
import * as MockData from '../../mocks/feedback.mock';

const feedbackRepository = new FeedbackRepository();
const feedbackService = new FeedbackService(feedbackRepository);

describe('FeedbackService test', () => {
  it('should return success by service FeedbackService on operation registerAppFeedback', async () => {
    feedbackRepository.registerAppFeedback = jest.fn().mockImplementation();

    const result = await feedbackService.registerAppFeedback(MockData.appFeedback);

    expect(result).toEqual('Feedback registered with successful!');
  });

  it('should return success by service FeedbackService on operation registerVehicleFeedback', async () => {
    feedbackRepository.registerVehicleFeedback = jest.fn().mockImplementation();

    const result = await feedbackService.registerVehicleFeedback(MockData.vehicleFeedback);

    expect(result).toEqual('Feedback registered with successful!');
  });
});
