import { Injectable } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleRepository } from '../repository/vehicle.repository';
import { Utils } from '../utils/utils.utils';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  public getVehicleInfo(registrationPlate: string): Promise<Vehicle> {
    return this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);
  }

  public createVehicle(vehicle: Vehicle): Vehicle {
    vehicle.passwordToShareLocalization = Utils.generateRandomPassword(9);

    this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    return vehicle;
  }

  public async updateVehicle(
    registrationPlate: string,
    vehicleInfosToUpdate: Vehicle,
  ): Promise<Vehicle> {
    await this.vehicleRepository.updateVehicleByRegistrationPlate(
      registrationPlate,
      vehicleInfosToUpdate,
    );

    const vehicle = await this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);

    return vehicle;
  }

  public deleteVehicle(registrationPlate: string): void {
    this.vehicleRepository.deleteVehicleByRegistrationPlate(registrationPlate);
  }
}
