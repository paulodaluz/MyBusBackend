import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeedbackController } from './controllers/feedback.controller';
import { UserController } from './controllers/user.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { FeedbackRepository } from './repository/feedback.repository';
import { UserRepository } from './repository/user.repository';
import { VehicleRepository } from './repository/vehicle.repository';
import { FeedbackService } from './services/feedback.service';
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicle.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [VehicleController, UserController, FeedbackController],
  providers: [
    VehicleService,
    UserService,
    VehicleRepository,
    UserRepository,
    FeedbackService,
    FeedbackRepository,
  ],
})
export class AppModule {}
