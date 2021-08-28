import { Injectable, Logger } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { CacheRepository } from '../repository/cache.repository';
import { VehicleRepository } from '../repository/vehicle.repository';
import { ErrorUtils } from '../utils/error.utils';
import { Utils } from '../utils/utils.utils';

@Injectable()
export class VehicleService {
  private className = 'VehicleService';

  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  public async getVehicleInfo(registrationPlate: string): Promise<Vehicle> {
    const vehicleInCache = await this.cacheRepository.getFromCache(registrationPlate);

    if (vehicleInCache) {
      return vehicleInCache;
    }

    Logger.log(
      `registrationPlate = ${registrationPlate}`,
      `${this.className} - ${this.getVehicleInfo.name}`,
    );

    const vehicle = await this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);

    if (!vehicle) {
      ErrorUtils.throwSpecificError(404);
    }

    await this.cacheRepository.saveInCache(vehicle.registrationPlate, JSON.stringify(vehicle));

    return vehicle;
  }

  public async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    Logger.log(
      `vehicle = ${JSON.stringify(vehicle)}`,
      `${this.className} - ${this.createVehicle.name}`,
    );

    const vehicleInCache = await this.cacheRepository.getFromCache(vehicle.registrationPlate);

    if (vehicleInCache) {
      ErrorUtils.throwSpecificError(400);
    }

    const vehicleExists = await this.vehicleRepository.getVehicleByRegistrationPlate(
      vehicle.registrationPlate,
    );

    if (vehicleExists && vehicleExists.registrationPlate) {
      await this.cacheRepository.saveInCache(
        vehicle.registrationPlate,
        JSON.stringify(vehicleExists),
      );

      ErrorUtils.throwSpecificError(400);
    }

    vehicle.passwordToShareLocalization = Utils.generateRandomPassword(9);

    await this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    await this.cacheRepository.saveInCache(vehicle.registrationPlate, JSON.stringify(vehicle));

    return vehicle;
  }

  public async updateVehicle(
    registrationPlate: string,
    vehicleInfosToUpdate: Vehicle,
  ): Promise<Vehicle> {
    Logger.log(
      `registrationPlate = ${registrationPlate} - vehicleInfosToUpdate =
      ${JSON.stringify(vehicleInfosToUpdate)}`,
      `${this.className} - ${this.updateVehicle.name}`,
    );

    const userAlreadyExists = await this.userAlreadyExists(registrationPlate);

    if(!userAlreadyExists) {
      ErrorUtils.throwSpecificError(404);
    }

    await this.vehicleRepository.updateVehicleByRegistrationPlate(
      registrationPlate,
      vehicleInfosToUpdate,
    );

    const vehicle = await this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);

    await this.cacheRepository.saveInCache(vehicle.registrationPlate, JSON.stringify(vehicle));

    return vehicle;
  }

  public async deleteVehicle(registrationPlate: string): Promise<void> {
    Logger.log(
      `registrationPlate = ${registrationPlate}`,
      `${this.className} - ${this.deleteVehicle.name}`,
    );

    const userAlreadyExists = await this.userAlreadyExists(registrationPlate);

    if(!userAlreadyExists) {
      ErrorUtils.throwSpecificError(404);
    }

    await this.cacheRepository.deleteCache(registrationPlate);

    this.vehicleRepository.deleteVehicleByRegistrationPlate(registrationPlate);
  }

  private async userAlreadyExists(registrationPlate: string): Promise<boolean> {
    const vehicle = await this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);

    if (!vehicle || !vehicle.registrationPlate) {
      return false;
    }

    return true;
  }
}
