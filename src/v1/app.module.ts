import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { UserController } from './controllers/user.controller';
import { VehicleController } from './controllers/vehicle.controller';
import { CacheRepository } from './repository/cache.repository';
import { UserRepository } from './repository/user.repository';
import { VehicleRepository } from './repository/vehicle.repository';
import { UserService } from './services/user.service';
import { VehicleService } from './services/vehicle.service';

const cacheDatabase: any = redisStore || 'memory';

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
  controllers: [VehicleController, UserController],
  providers: [VehicleService, UserService, VehicleRepository, CacheRepository, UserRepository],
})
export class AppModule {}
