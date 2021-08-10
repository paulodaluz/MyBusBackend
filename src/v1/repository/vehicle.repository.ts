import { Injectable } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { RegisterVehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository {
  public getVehicleByRegistrationPlate(registrationPlate: string) {
    return registrationPlate;
  }

  public async registerVehicle(vehicle: RegisterVehicle): Promise<string> {
    const result = await db
      .collection('vehicles')
      .add(vehicle)
      .catch((error: any) => {
        throw error;
      });

    return result.id;
  }
}
