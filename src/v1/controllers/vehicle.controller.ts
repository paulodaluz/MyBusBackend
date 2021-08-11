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
} from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleService } from '../services/vehicle.service';
import { RegisterVehicleValidator } from '../validators/vehicle.validator';

@Controller('/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/get-vehicle-info/:identifier')
  public getVehicleInfos(@Param('identifier') identifier: string): Promise<Vehicle> {
    return this.vehicleService.getVehicleInfo(identifier);
  }

  @Post('/register-vehicle')
  public registerVehicle(@Body(new ValidationPipe()) body: RegisterVehicleValidator): Vehicle {
    return this.vehicleService.createVehicle(body);
  }

  @Put('/update-vehicle')
  public updateVehicle(@Body() body: any): Object {
    return body;
  }

  @Delete('/delete-vehicle/:identifier')
  @HttpCode(201)
  public deleteVehicle(@Param('identifier') identifier: string): void {
    return this.vehicleService.deleteVehicle(identifier);
  }
}
