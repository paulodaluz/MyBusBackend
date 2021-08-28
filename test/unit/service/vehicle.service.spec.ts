import { Cache } from 'cache-manager';
import { CacheRepository } from '../../../src/v1/repository/cache.repository';
import { VehicleRepository } from '../../../src/v1/repository/vehicle.repository';
import { VehicleService } from '../../../src/v1/services/vehicle.service';
import * as MockData from '../../mocks/vehicle.mock';

const vehicleRepository = new VehicleRepository();
const cacheRepository = new CacheRepository({} as Cache);
const vehicleService = new VehicleService(vehicleRepository, cacheRepository);

describe('VehicleService test', () => {
  it('should return a vehicle by service VehicleRepository on operation getVehicleInfo', async () => {
    cacheRepository.getFromCache = jest.fn().mockResolvedValueOnce(undefined);

    vehicleRepository.getVehicleByRegistrationPlate = jest
      .fn()
      .mockResolvedValueOnce(MockData.vehicle);

    const result = await vehicleService.getVehicleInfo('IBMC2789');

    expect(result.registrationPlate).toEqual('IBMC2789');
    expect(result.name).toEqual('Hipica Planaltina');
    expect(result.idToPassengers).toEqual('#WZ6WBI');
    expect(Array.isArray(result.busStations)).toBe(true);
    expect(result.busStations.length).toBe(1);
    expect(result.passwordToShareLocalization).toEqual('MH0M7FXMF');
    expect(result.passwordToShareLocalization?.length).toEqual(9);
    expect(result.priceTransport).toEqual(3.9);
    expect(result.isPublic).toEqual(false);
    expect(result.airConditioning).toEqual(true);
    expect(result.suportWheelchair).toBe(true);
    expect(result.washrooms).toBe(true);
    expect(result.wifi).toBe(true);
  });

  it('should return a vehicle by cache on operation getVehicleInfo', async () => {
    cacheRepository.getFromCache = jest.fn().mockResolvedValueOnce(MockData.vehicle);

    const result = await vehicleService.getVehicleInfo('IBMC2789');

    expect(result.registrationPlate).toEqual('IBMC2789');
    expect(result.name).toEqual('Hipica Planaltina');
    expect(result.idToPassengers).toEqual('#WZ6WBI');
    expect(Array.isArray(result.busStations)).toBe(true);
    expect(result.busStations.length).toBe(1);
    expect(result.passwordToShareLocalization).toEqual('MH0M7FXMF');
    expect(result.passwordToShareLocalization?.length).toEqual(9);
    expect(result.priceTransport).toEqual(3.9);
    expect(result.isPublic).toEqual(false);
    expect(result.airConditioning).toEqual(true);
    expect(result.suportWheelchair).toBe(true);
    expect(result.washrooms).toBe(true);
    expect(result.wifi).toBe(true);
  });
});
