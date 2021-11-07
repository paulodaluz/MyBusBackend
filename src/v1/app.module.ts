import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { FeedbackController } from './controllers/feedback.controller';
import { UserController } from './controllers/user.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { CacheRepository } from './repository/cache.repository';
import { FeedbackRepository } from './repository/feedback.repository';
import { UserRepository } from './repository/user.repository';
import { VehicleRepository } from './repository/vehicle.repository';
import { FeedbackService } from './services/feedback.service';
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicle.service';

const cacheDatabase: any = process.env.REDIS_ENABLE === 'false' ? 'memory' : redisStore;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CacheModule.register({
      store: cacheDatabase,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
  ],
  controllers: [VehicleController, UserController, FeedbackController],
  providers: [
    VehicleService,
    UserService,
    VehicleRepository,
    CacheRepository,
    UserRepository,
    FeedbackService,
    FeedbackRepository,
  ],
})
export class AppModule {}
