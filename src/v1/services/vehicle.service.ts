import { Injectable, Logger } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleRepository } from '../repository/vehicle.repository';
import { Utils } from '../utils/utils.utils';

@Injectable()
export class VehicleService {
  private className = 'VehicleService';

  constructor(private readonly vehicleRepository: VehicleRepository) {}

  public getVehicleInfo(registrationPlate: string): Promise<Vehicle> {
    Logger.log(`[${this.className}] - [getVehicleInfo] - registrationPlate = ${registrationPlate}`);

    return this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);
  }

  public createVehicle(vehicle: Vehicle): Vehicle {
    Logger.log(`[${this.className}] - [createVehicle] - vehicle = ${vehicle}`);

    vehicle.passwordToShareLocalization = Utils.generateRandomPassword(9);

    this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    return vehicle;
  }

  public async updateVehicle(
    registrationPlate: string,
    vehicleInfosToUpdate: Vehicle,
  ): Promise<Vehicle> {
    Logger.log(`[${this.className}] - [updateVehicle] - registrationPlate = ${registrationPlate}
      - vehicleInfosToUpdate = ${vehicleInfosToUpdate}`);

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
