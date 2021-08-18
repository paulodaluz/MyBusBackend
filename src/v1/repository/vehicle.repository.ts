import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository {
  private className = 'VehicleRepository';

  private databaseOfVehicles: string;

  constructor() {
    this.databaseOfVehicles = 'vehicles';
  }

  public async getVehicleByRegistrationPlate(registrationPlate: string): Promise<Vehicle> {
    Logger.log(
      `[${this.className}] - [getVehicleByRegistrationPlate] - registrationPlate = ${registrationPlate}`,
    );

    const vehicle = await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .get()
      .catch((error: any) => {
        Logger.error(
          `[${this.className}] - [getVehicleByRegistrationPlate] - registrationPlate =
            ${registrationPlate} - error = ${error}`,
        );

        throw error;
      });

    Logger.log(
      `[${this.className}] - [getVehicleByRegistrationPlate] - registrationPlate =
        ${registrationPlate} - SUCCESS`,
    );

    return vehicle.data();
  }

  public async registerVehicle(registrationPlate: string, vehicle: Vehicle): Promise<void> {
    Logger.log(
      `[${this.className}] - [registerVehicle] - registrationPlate =
        ${registrationPlate} - vehicle = ${vehicle}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .set(vehicle)
      .catch((error: any) => {
        Logger.error(
          `[${this.className}] - [registerVehicle] - registrationPlate = ${registrationPlate} - error = ${error}`,
        );

        throw error;
      });

    Logger.log(
      `[${this.className}] - [registerVehicle] - registrationPlate = ${registrationPlate} - SUCCESS`,
    );
  }

  public async deleteVehicleByRegistrationPlate(registrationPlate: string): Promise<void> {
    Logger.log(
      `[${this.className}] - [deleteVehicleByRegistrationPlate] - registrationPlate = ${registrationPlate}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `[${this.className}] - [deleteVehicleByRegistrationPlate] - registrationPlate =
            ${registrationPlate} - error = ${error}`,
        );

        throw error;
      });

    Logger.log(
      `[${this.className}] - [deleteVehicleByRegistrationPlate] - registrationPlate = ${registrationPlate} - SUCCESS`,
    );
  }

  public async updateVehicleByRegistrationPlate(
    registrationPlate: string,
    vehicle: Vehicle,
  ): Promise<void> {
    Logger.log(
      `[${this.className}] - [updateVehicleByRegistrationPlate] - registrationPlate =
        ${registrationPlate} - vehicle = ${vehicle}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .update(vehicle)
      .catch((error: any) => {
        Logger.error(
          `[${this.className}] - [updateVehicleByRegistrationPlate] - registrationPlate =
            ${registrationPlate} - error = ${error}`,
        );

        throw error;
      });
  }
}
