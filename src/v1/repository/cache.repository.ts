import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async getFromCache(
    redisKey: string,
    cacheControl: string = 'true',
  ): Promise<Vehicle | undefined> {
    if (!this.isEnabledRedis() || cacheControl === 'false') return undefined;

    let result: string | undefined;

    Logger.log(`redisKey = ${redisKey}`, 'CacheRepository - getFromCache');

    try {
      result = await this.cacheManager.get(redisKey);

      if (result && typeof result === 'string') {
        Logger.log(`redisKey = ${redisKey} - result = ${result}`, 'CacheRepository - getFromCache');

        return JSON.parse(result);
      }

      Logger.log(`redisKey = ${redisKey} - result = undefined`, 'CacheRepository - getFromCache');

      return undefined;
    } catch (error) {
      Logger.error(
        `Error while trying to retrieve ms response from redis.
          redisKey = ${redisKey} - Error: ${JSON.stringify(error)}`,
      );

      return undefined;
    }
  }

  public async saveInCache(
    redisKey: string,
    value: string,
    cacheControl: string = 'true',
  ): Promise<void> {
    if (!this.isEnabledRedis() || cacheControl === 'false') return;

    const expirationTime = this.getExpirationTime();

    Logger.log(`redisKey = ${redisKey} - value = ${value}`, 'CacheRepository - saveInCache');

    try {
      await this.cacheManager.del(redisKey);

      await this.cacheManager.set(redisKey, value, { ttl: expirationTime });

      Logger.log(`redisKey = ${redisKey} - SAVED WITH SUCCESS`, 'CacheRepository - saveInCache');
    } catch (error) {
      Logger.error(
        `Error while trying to save ms response from redis.
          redisKey = ${redisKey} - Error: ${JSON.stringify(error)}`,
      );
    }
  }

  private getExpirationTime() {
    if (process.env.REDIS_EXPIRATION_CACHE_MS_RESPONSE)
      return Number(process.env.REDIS_EXPIRATION_CACHE_MS_RESPONSE);

    return 3600;
  }

  private isEnabledRedis(): boolean {
    return process.env.REDIS_ENABLE === 'true';
  }
}
