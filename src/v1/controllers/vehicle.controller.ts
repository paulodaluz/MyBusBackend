import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegisterVehicle } from '../interfaces/vehicle.interface';
import { VehicleService } from '../services/vehicle.service';

@Controller('/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/get-vehicle-info/:identifier')
  public getVehicleInfos(@Param('identifier') identifier: string): Object {
    return this.vehicleService.getVehicleInfo(identifier);
  }

  @Post('/register-vehicle')
  public registerVehicle(@Body() body: RegisterVehicle): Promise<string> {
    return this.vehicleService.createVehicle(body);
  }

  @Put('/update-vehicle')
  public updateVehicle(@Body() body: any): Object {
    return body;
  }

  @Delete('/delete-vehicle')
  public deleteVehicle(@Body() body: any): Object {
    return body;
  }
}
