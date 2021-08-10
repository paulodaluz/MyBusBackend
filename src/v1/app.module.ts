import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleRepository } from './repository/vehicle.repository';
import { VehicleService } from './services/vehicle.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
})

export class AppModule {}
