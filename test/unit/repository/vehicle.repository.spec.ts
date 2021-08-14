import { VehicleRepository } from '../../../src/v1/repository/vehicle.repository';
import * as MockData from '../../mocks/vehicle.mock';

const vehicleRepository = new VehicleRepository();

describe('VehicleRepository test', () => {
  it('getVehicleByRegistrationPlate ok', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest.fn().mockResolvedValueOnce(MockData.vehicle);

    const result = await vehicleRepository.getVehicleByRegistrationPlate(
      'IBMC2789'
    );

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
