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
    Logger.log(`[${this.className}] - [getVehicleInfos] - identifier = ${identifier}`);

    return this.vehicleService.getVehicleInfo(identifier);
  }

  @Post('/register-vehicle')
  public registerVehicle(@Body(new ValidationPipe()) body: RegisterVehicleValidator): Vehicle {
    Logger.log(`[${this.className}] - [registerVehicle] - body = ${body}`);

    return this.vehicleService.createVehicle(body);
  }

  @Put('/update-vehicle/:identifier')
  public updateVehicle(
    @Param('identifier') identifier: string,
    @Body() body: Vehicle,
  ): Promise<Vehicle> {
    Logger.log(
      `[${this.className}] - [updateVehicle] - identifier = ${identifier} - body = ${body}`,
    );

    return this.vehicleService.updateVehicle(identifier, body);
  }

  @Delete('/delete-vehicle/:identifier')
  @HttpCode(201)
  public deleteVehicle(@Param('identifier') identifier: string): void {
    Logger.log(`[${this.className}] - [deleteVehicle] - identifier = ${identifier}`);

    return this.vehicleService.deleteVehicle(identifier);
  }
}
