import { Cache } from 'cache-manager';
import { CacheRepository } from '../../../src/v1/repository/cache.repository';
import * as MockData from '../../mocks/user.mock';

const cacheManager: Cache = {
  get: jest.fn().mockResolvedValueOnce(JSON.stringify(MockData.userPassenger)),
  wrap: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
  store: {
    set: jest.fn(),
    get: jest.fn(),
  },
};

beforeEach(() => {
  jest.clearAllMocks();
  cacheManager.get = jest.fn().mockResolvedValueOnce(JSON.stringify(MockData.userPassenger));
});

const cacheRepository = new CacheRepository(cacheManager);

describe('CacheRepository test', () => {
  it('should return a user by cache on operation getFromCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    const result = await cacheRepository.getFromCache('abc');

    expect(result.email).toEqual('joao.carlos@email.com');
    expect(result.name).toEqual('João Carlos Almeida');
    expect(result.isPassenger).toEqual(true);
    expect(result.cpf).toEqual('382.371.580-16');
    expect(result.uid).toEqual('me3LaIM4YthvHc40A4v9I1CgbKo21111');
    expect(Array.isArray(result.linkedVehicles)).toEqual(true);
    expect(result.linkedVehicles.includes('IBCM2789')).toEqual(true);
  });

  it('should return undefined because cache isnt enable on operation getFromCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(false);

    const result = await cacheRepository.getFromCache('abc');

    expect(result).toEqual(undefined);
  });

  it('should return undefined by cache on operation getFromCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(false);

    const result = await cacheRepository.getFromCache('abc');

    expect(result).toEqual(undefined);
  });

  it('should return undefined by cache on operation getFromCache', async () => {
    cacheManager.get = jest.fn().mockResolvedValueOnce(undefined);

    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    const result = await cacheRepository.getFromCache('abc');

    expect(result).toEqual(undefined);
  });

  it('should return undefined by cache on operation getFromCache', async () => {
    cacheManager.get = jest.fn().mockRejectedValueOnce(new Error('Error'));

    const cacheRepositoryError = new CacheRepository(cacheManager);

    jest.spyOn(cacheRepositoryError as any, 'isEnabledRedis').mockReturnValue(true);

    await cacheRepositoryError.getFromCache('abc').catch((err) => {
      expect(err).toEqual(undefined);
    });
  });

  it('should return success on operation saveInCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    const spy = jest.spyOn(cacheManager, 'del').mockReturnValueOnce({} as any);

    const spy2 = jest.spyOn(cacheManager, 'set').mockReturnValueOnce({} as any);

    await cacheRepository.saveInCache('abc', JSON.stringify(MockData.userPassenger));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should return success on operation saveInCache', async () => {
    process.env = { REDIS_EXPIRATION_CACHE_MS_RESPONSE: '3600' };

    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    const spy = jest.spyOn(cacheManager, 'del').mockReturnValueOnce({} as any);

    const spy2 = jest.spyOn(cacheManager, 'set').mockReturnValueOnce({} as any);

    await cacheRepository.saveInCache('abc', JSON.stringify(MockData.userPassenger));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should return undefined by cache on operation saveInCache', async () => {
    cacheManager.set = jest.fn().mockRejectedValueOnce(new Error('Error'));

    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    await cacheRepository
      .saveInCache('abc', JSON.stringify(MockData.userPassenger))
      .catch((err) => {
        expect(err).toEqual(undefined);
      });
  });

  it('should return success on operation deleteCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(true);

    const spy = jest.spyOn(cacheManager, 'del').mockReturnValueOnce({} as any);

    await cacheRepository.deleteCache('abc');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return undefined by cache on operation deleteCache', async () => {
    jest.spyOn(cacheRepository as any, 'isEnabledRedis').mockReturnValue(false);

    const result = await cacheRepository.deleteCache('abc');

    expect(result).toEqual(undefined);
  });
});
