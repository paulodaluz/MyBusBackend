import { Injectable } from '@nestjs/common';
import { RegisterVehicle } from '../interfaces/vehicle.interface';
import { VehicleRepository } from '../repository/vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  public getVehicleInfo(identifier: string): Object {
    return this.vehicleRepository.getVehicleByRegistrationPlate(identifier);
  }

  public createVehicle(vehicle: RegisterVehicle): RegisterVehicle {
    this.vehicleRepository.registerVehicle(vehicle.registrationPlate, vehicle);

    return vehicle;
  }
}
