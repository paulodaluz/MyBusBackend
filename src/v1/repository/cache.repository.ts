import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRepository {
  private className = 'CacheRepository';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async getFromCache(
    redisKey: string,
    cacheControl: string = 'true',
  ): Promise<any | undefined> {
    if (!this.isEnabledRedis() || cacheControl === 'false') return undefined;

    let result: string | undefined;

    Logger.log(`redisKey = ${redisKey}`, `${this.className} - ${this.getFromCache.name}`);

    try {
      result = await this.cacheManager.get(redisKey);

      if (result && typeof result === 'string') {
        Logger.log(
          `redisKey = ${redisKey} - result = ${result}`,
          `${this.className} - ${this.getFromCache.name}`,
        );

        return JSON.parse(result);
      }

      Logger.log(
        `redisKey = ${redisKey} - result = undefined`,
        `${this.className} - ${this.getFromCache.name}`,
      );

      return undefined;
    } catch (error) {
      Logger.error(
        `Error while trying to retrieve ms response from redis.
          redisKey = ${redisKey} - Error: ${JSON.stringify(error)}`,
        '',
        `${this.className} - ${this.getFromCache.name}`,
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

    Logger.log(
      `redisKey = ${redisKey} - value = ${value}`,
      `${this.className} - ${this.saveInCache.name}`,
    );

    try {
      await this.cacheManager.del(redisKey);

      await this.cacheManager.set(redisKey, value, { ttl: expirationTime });

      Logger.log(
        `redisKey = ${redisKey} - SAVED WITH SUCCESS`,
        `${this.className} - ${this.saveInCache.name}`,
      );
    } catch (error) {
      Logger.error(
        `Error while trying to save ms response from redis.
          redisKey = ${redisKey} - Error: ${JSON.stringify(error)}`,
        '',
        `${this.className} - ${this.saveInCache.name}`,
      );
    }
  }

  public async deleteCache(redisKey: string): Promise<void> {
    if (!this.isEnabledRedis()) return;

    await this.cacheManager.del(redisKey);
  }

  private getExpirationTime(): number {
    if (process.env.REDIS_EXPIRATION_CACHE_MS_RESPONSE)
      return Number(process.env.REDIS_EXPIRATION_CACHE_MS_RESPONSE);

    return 3600;
  }

  private isEnabledRedis(): boolean {
    return process.env.REDIS_ENABLE === 'true';
  }
}
