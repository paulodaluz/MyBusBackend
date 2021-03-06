import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleService } from '../services/vehicle.service';
import { RegisterVehicleValidator } from '../validators/vehicle.validator';

@Controller('/vehicles')
export class VehicleController {
  private className = 'VehicleController';

  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/get-vehicle-info/:identifier')
  public getVehicleInfos(@Param('identifier') identifier: string): Promise<Vehicle> {
    Logger.log(`identifier = ${identifier}`, `${this.className} - ${this.getVehicleInfos.name}`);

    return this.vehicleService.getVehicleInfo(identifier);
  }

  @Post('/get-vehicles-infos')
  public getVehiclesInfos(
    @Body('registrationPlates') registrationPlates: Array<string>,
  ): Promise<Array<Vehicle>> {
    Logger.log(
      `registrationPlates = ${registrationPlates}`,
      `${this.className} - ${this.getVehiclesInfos.name}`,
    );

    return this.vehicleService.getVehiclesInfos(registrationPlates);
  }

  @Post('/register-vehicle')
  public registerVehicle(
    @Body(new ValidationPipe()) body: RegisterVehicleValidator,
  ): Promise<Vehicle> {
    Logger.log(`body = ${body}`, `${this.className} - ${this.registerVehicle.name}`);

    return this.vehicleService.createVehicle(body);
  }

  @Put('/update-vehicle/:identifier')
  public updateVehicle(
    @Param('identifier') identifier: string,
    @Body() body: Vehicle,
  ): Promise<Vehicle> {
    Logger.log(
      `identifier = ${identifier} - body = ${body}`,
      `${this.className} - ${this.updateVehicle.name}`,
    );

    return this.vehicleService.updateVehicle(identifier, body);
  }

  @Delete('/delete-vehicle/:identifier')
  @HttpCode(201)
  public deleteVehicle(@Param('identifier') identifier: string): Promise<void> {
    Logger.log(`identifier = ${identifier}`, `${this.className} - ${this.deleteVehicle.name}`);

    return this.vehicleService.deleteVehicle(identifier);
  }
}
