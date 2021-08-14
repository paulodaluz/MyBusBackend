import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehicleController } from './vehicles/controllers/vehicle.controller';
import { VehicleRepository } from './vehicles/repository/vehicle.repository';
import { VehicleService } from './vehicles/services/vehicle.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
