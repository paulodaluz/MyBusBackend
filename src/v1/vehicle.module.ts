import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { VehicleController } from './controllers/vehicle.controller';
import { CacheRepository } from './repository/cache.repository';
import { VehicleRepository } from './repository/vehicle.repository';
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
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository, CacheRepository],
})
export class VehicleModule {}
