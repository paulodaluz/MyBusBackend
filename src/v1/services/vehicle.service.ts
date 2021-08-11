import { Injectable } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleRepository } from '../repository/vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  public getVehicleInfo(registrationPlate: string): Promise<Vehicle> {
    return this.vehicleRepository.getVehicleByRegistrationPlate(registrationPlate);
  }

  public createVehicle(vehicle: Vehicle): Vehicle {
    this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    return vehicle;
  }

  public deleteVehicle(registrationPlate: string): void {
    this.vehicleRepository.deleteVehicleByRegistrationPlate(registrationPlate);
  }
}
