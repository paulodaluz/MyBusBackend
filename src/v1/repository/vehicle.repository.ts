import { Injectable } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository {
  public async getVehicleByRegistrationPlate(registrationPlate: string): Promise<Vehicle> {
    const vehicle = await db
      .collection('vehicles')
      .doc(registrationPlate)
      .get()
      .catch((error: any) => {
        throw error;
      });

    return vehicle.data();
  }

  public async registerVehicle(registrationPlate: string, vehicle: Vehicle): Promise<void> {
    await db
      .collection('vehicles')
      .doc(registrationPlate)
      .set(vehicle)
      .catch((error: any) => {
        throw error;
      });
  }

  public async deleteVehicleByRegistrationPlate(registrationPlate: string): Promise<void> {
    await db
      .collection('vehicles')
      .doc(registrationPlate)
      .delete()
      .catch((error: any) => {
        throw error;
      });
  }
}
