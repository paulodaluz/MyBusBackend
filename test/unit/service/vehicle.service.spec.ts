import { VehicleRepository } from '../../../src/v1/repository/vehicle.repository';
import { VehicleService } from '../../../src/v1/services/vehicle.service';
import * as MockData from '../../mocks/vehicle.mock';

const vehicleRepository = new VehicleRepository();
const vehicleService = new VehicleService(vehicleRepository);

describe('VehicleService test', () => {
  it('should return a vehicle by service VehicleRepository on operation getVehicleInfo', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest
      .fn()
      .mockResolvedValueOnce(MockData.vehicleResponse);

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

  it('should return a error on operation getVehicleInfo', async () => {
    try {
      await vehicleService.getVehicleInfo('IBMC2789');
    } catch (err) {
      expect(err.status).toEqual(404);
      expect(err.message).toEqual('The specified resource is not found.');
    }
  });

  it('should return success on creating a vehicle', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest.fn().mockResolvedValueOnce(undefined);
    vehicleRepository.registerVehicle = jest.fn().mockImplementation();

    const result = await vehicleService.createVehicle(MockData.vehicleToCreate);

    expect(result.registrationPlate).toEqual('IBMC2789');
    expect(result.name).toEqual('Hipica Planaltina');
    expect(result.idToPassengers).toEqual('#WZ6WBI');
    expect(Array.isArray(result.busStations)).toBe(true);
    expect(result.busStations.length).toBe(1);
    expect(result.passwordToShareLocalization?.length).toEqual(9);
    expect(result.priceTransport).toEqual(3.9);
    expect(result.isPublic).toEqual(false);
    expect(result.airConditioning).toEqual(true);
    expect(result.suportWheelchair).toBe(true);
    expect(result.washrooms).toBe(true);
    expect(result.wifi).toBe(true);
  });

  it('should return error on creating a vehicle because exists on cache', async () => {
    try {
      await vehicleService.createVehicle(MockData.vehicleToCreate);
    } catch (err) {
      expect(err.status).toEqual(400);
      expect(err.message).toEqual(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return error on creating a vehicle because vehicle already exists', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest
      .fn()
      .mockResolvedValueOnce(MockData.vehicleResponse);

    try {
      await vehicleService.createVehicle(MockData.vehicleToCreate);
    } catch (err) {
      expect(err.status).toEqual(400);
      expect(err.message).toEqual(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return success on updating a vehicle', async () => {
    vehicleRepository.updateVehicleByRegistrationPlate = jest.fn().mockImplementation();

    vehicleRepository.getVehicleByRegistrationPlate = jest
      .fn()
      .mockResolvedValue(MockData.vehicleResponse);

    const result = await vehicleService.updateVehicle('IBMC2789', MockData.vehicleResponse);

    expect(result.registrationPlate).toEqual('IBMC2789');
    expect(result.name).toEqual('Hipica Planaltina');
    expect(result.idToPassengers).toEqual('#WZ6WBI');
    expect(Array.isArray(result.busStations)).toBe(true);
    expect(result.busStations.length).toBe(1);
    expect(result.passwordToShareLocalization?.length).toEqual(9);
    expect(result.priceTransport).toEqual(3.9);
    expect(result.isPublic).toEqual(false);
    expect(result.airConditioning).toEqual(true);
    expect(result.suportWheelchair).toBe(true);
    expect(result.washrooms).toBe(true);
    expect(result.wifi).toBe(true);
  });

  it('should return error on updating a vehicle because user dont exists', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest.fn().mockResolvedValueOnce(undefined);

    try {
      await vehicleService.updateVehicle('IBMC2789', MockData.vehicleResponse);
    } catch (err) {
      expect(err.status).toEqual(404);
      expect(err.message).toEqual('The specified resource is not found.');
    }
  });

  it('should return success on delete a vehicle', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest
      .fn()
      .mockResolvedValueOnce(MockData.vehicleResponse);

    const spy = jest
      .spyOn(vehicleRepository, 'deleteVehicleByRegistrationPlate')
      .mockReturnValueOnce({} as any);

    await vehicleService.deleteVehicle('IBMC2789');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return error on delete a vehicle because user dont exists', async () => {
    vehicleRepository.getVehicleByRegistrationPlate = jest.fn().mockResolvedValueOnce(undefined);

    try {
      await vehicleService.deleteVehicle('IBMC2789');
    } catch (err) {
      expect(err.status).toEqual(404);
      expect(err.message).toEqual('The specified resource is not found.');
    }
  });
});
