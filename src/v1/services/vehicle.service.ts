import { Injectable, Logger } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { CacheRepository } from '../repository/cache.repository';
import { VehicleRepository } from '../repository/vehicle.repository';
import { Utils } from '../utils/utils.utils';

@Injectable()
export class VehicleService {
  private className = 'VehicleService';

  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  public getVehicleInfo(registrationPlate: string): Promise<Vehicle> {
    Logger.log(`[${this.className}] - [getVehicleInfo] - registrationPlate = ${registrationPlate}`);

    return this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);
  }

  public async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const vehicleInCache = await this.cacheRepository.getFromCache(vehicle.registrationPlate);

    if (vehicleInCache) {
      return vehicleInCache;
    }

    Logger.log(`[${this.className}] - [createVehicle] - vehicle = ${vehicle}`);

    vehicle.passwordToShareLocalization = Utils.generateRandomPassword(9);

    this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    await this.cacheRepository.saveInCache(vehicle.registrationPlate, JSON.stringify(vehicle));

    return vehicle;
  }

  public async updateVehicle(
    registrationPlate: string,
    vehicleInfosToUpdate: Vehicle,
  ): Promise<Vehicle> {
    Logger.log(
      `[${this.className}] - [updateVehicle] - registrationPlate = ${registrationPlate}
        - vehicleInfosToUpdate = ${vehicleInfosToUpdate}`,
    );

    await this.vehicleRepository.updateVehicleByRegistrationPlate(
      registrationPlate,
      vehicleInfosToUpdate,
    );

    return this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);
  }

  public deleteVehicle(registrationPlate: string): void {
    Logger.log(`[${this.className}] - [deleteVehicle] - registrationPlate = ${registrationPlate}`);

    this.vehicleRepository.deleteVehicleByRegistrationPlate(registrationPlate);
  }
}
