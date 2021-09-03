import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserService } from '../../../src/v1/services/user.service';
import { AppModule } from '../../../src/v1/app.module';
import * as MockData from '../../mocks/mock.data';

describe('UserController test', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userService = await moduleRef.resolve(UserService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET getUserInfos 200 ok', async () => {
    userService.getUserInfo = jest.fn().mockResolvedValueOnce(MockData.getUserResponse);

    return request(app.getHttpServer())
      .get(`/user/get-user-info/me3LaIM4YthvHc40A4v9I1CgbKo2`)
      .expect(200)
      .expect(MockData.getUserResponse);
  });

  it('/POST registerUser 200 ok', async () => {
    userService.createUser = jest.fn().mockResolvedValueOnce(MockData.getUserResponse);

    return request(app.getHttpServer())
      .post(`/user/register-user`)
      .set('Content-type', 'application/json')
      .send(MockData.getUserResponse)
      .expect(201);
  });
});
