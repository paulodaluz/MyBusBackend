import { Injectable } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { RegisterVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository {
  public getVehicleByRegistrationPlate(registrationPlate: string) {
    return registrationPlate;
  }

  public async registerVehicle(registrationPlate: string, vehicle: RegisterVehicle): Promise<void> {
    await db
      .collection('vehicles')
      .doc(registrationPlate)
      .set(vehicle)
      .catch((error: any) => {
        throw error;
      });
  }
}
