import { Injectable, Logger } from '@nestjs/common';
import { db } from '../database/configuration.database';
import { Vehicle } from '../interfaces/vehicle.interface';
import { ErrorUtils } from '../utils/error.utils';

@Injectable()
export class VehicleRepository {
  private className = 'VehicleRepository';

  private databaseOfVehicles: string;

  constructor() {
    this.databaseOfVehicles = 'vehicles';
  }

  public async getVehicleByRegistrationPlate(registrationPlate: string): Promise<Vehicle> {
    Logger.log(
      `registrationPlate = ${registrationPlate}`,
      `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
    );

    const vehicle = await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .get()
      .catch((error: any) => {
        Logger.error(
          `registrationPlate = ${registrationPlate} - error = ${error}`,
          '',
          `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `registrationPlate = ${registrationPlate} - SUCCESS`,
      `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
    );

    return vehicle.data();
  }

  public async registerVehicle(registrationPlate: string, vehicle: Vehicle): Promise<void> {
    Logger.log(
      `registrationPlate = ${registrationPlate} - vehicle = ${vehicle}`,
      `${this.className} - ${this.registerVehicle.name}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .set(vehicle)
      .catch((error: any) => {
        Logger.error(
          `registrationPlate = ${registrationPlate} - error = ${error}`,
          '',
          `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `registrationPlate = ${registrationPlate} - SUCCESS`,
      `${this.className} - ${this.registerVehicle.name}`,
    );
  }

  public async deleteVehicleByRegistrationPlate(registrationPlate: string): Promise<void> {
    Logger.log(
      `registrationPlate = ${registrationPlate}`,
      `${this.className} - ${this.deleteVehicleByRegistrationPlate.name}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `registrationPlate = ${registrationPlate} - error = ${error}`,
          '',
          `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `registrationPlate = ${registrationPlate} - SUCCESS`,
      `${this.className} - ${this.deleteVehicleByRegistrationPlate.name}`,
    );
  }

  public async updateVehicleByRegistrationPlate(
    registrationPlate: string,
    vehicle: Vehicle,
  ): Promise<void> {
    Logger.log(
      `registrationPlate = ${registrationPlate} - vehicle = ${vehicle}`,
      `${this.className} - ${this.updateVehicleByRegistrationPlate.name}`,
    );

    await db
      .collection(this.databaseOfVehicles)
      .doc(registrationPlate)
      .update(vehicle)
      .catch((error: any) => {
        Logger.error(
          `registrationPlate = ${registrationPlate} - error = ${error}`,
          '',
          `${this.className} - ${this.getVehicleByRegistrationPlate.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(
      `registrationPlate = ${registrationPlate} - SUCCESS`,
      `${this.className} - ${this.updateVehicleByRegistrationPlate.name}`,
    );
  }
}
