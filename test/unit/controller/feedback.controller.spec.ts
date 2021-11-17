import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { FeedbackService } from '../../../src/v1/services/feedback.service';
import { AppModule } from '../../../src/v1/app.module';

describe('FeedbackController test', () => {
  let app: INestApplication;
  let feedbackService: FeedbackService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    feedbackService = await moduleRef.resolve(FeedbackService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET appFeedback 200 ok', async () => {
    feedbackService.registerAppFeedback = jest
      .fn()
      .mockResolvedValueOnce('Feedback registered with successful!');

    return request(app.getHttpServer())
      .post(`/feedback/app`)
      .set('Content-type', 'application/json')
      .send({
        emailSender: 'example1@email.com',
        nameSender: 'FirstName LastName',
        feedback: "It's a good app.",
      })
      .expect(201)
      .expect('Feedback registered with successful!');
  });

  it('/POST vehicleFeedback 201 ok', async () => {
    feedbackService.registerVehicleFeedback = jest
      .fn()
      .mockResolvedValueOnce('Feedback registered with successful!');

    return request(app.getHttpServer())
      .post(`/feedback/vehicle`)
      .set('Content-type', 'application/json')
      .send({
        emailSender: 'example@email.com',
        nameSender: 'FirstName LastName',
        vehicleName: 'Bus Example',
        vehicleRegistrationPlate: 'KUR-3164',
        feedback: "It's a good app.",
      })
      .expect(201)
      .expect('Feedback registered with successful!');
  });
});
