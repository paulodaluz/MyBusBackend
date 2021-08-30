import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { VehicleService } from '../../../src/v1/services/vehicle.service';
import { AppModule } from '../../../src/v1/app.module';
import * as MockData from '../../mocks/vehicle.mock';

describe('', () => {
  let app: INestApplication;
  let vehicleService: VehicleService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    vehicleService = await moduleRef.resolve(VehicleService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET getVehicleInfos 200 ok', async () => {
    vehicleService.getVehicleInfo = jest.fn().mockResolvedValueOnce(MockData.vehicleResponse);

    return request(app.getHttpServer())
      .get(`/vehicles/get-vehicle-info/IBMC2789`)
      .expect(200)
      .expect(MockData.vehicleResponse);
  });

  it('/POST registerVehicle 201 ok', async () => {
    vehicleService.createVehicle = jest.fn().mockResolvedValueOnce(MockData.vehicleResponse);

    return request(app.getHttpServer())
      .post(`/vehicles/register-vehicle`)
      .set('Content-type', 'application/json')
      .send(MockData.vehicleToCreate)
      .expect(201)
      .expect(MockData.vehicleResponse);
  });

  it('/PUT updateVehicle 200 ok', async () => {
    vehicleService.updateVehicle = jest.fn().mockResolvedValueOnce(MockData.vehicleResponse);

    const vehicleToUpdate = MockData.vehicleResponse;
    vehicleToUpdate.name = 'São Cristovão';

    return request(app.getHttpServer())
      .put(`/vehicles/update-vehicle/IBMC2789`)
      .set('Content-type', 'application/json')
      .send(MockData.vehicleResponse)
      .expect(200)
      .expect((response) => response.body.name === 'São Cristovão');
  });

  it('/DELETE deleteVehicle 201 ok', async () => {
    vehicleService.deleteVehicle = jest.fn().mockImplementation();

    return request(app.getHttpServer()).delete(`/vehicles/delete-vehicle/IBMC2789`).expect(201);
  });
});
