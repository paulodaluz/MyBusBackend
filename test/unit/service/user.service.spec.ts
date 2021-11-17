import { UserRepository } from '../../../src/v1/repository/user.repository';
import { UserService } from '../../../src/v1/services/user.service';
import * as MockData from '../../mocks/user.mock';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

describe('UserService test', () => {
  it('should return a user by service UserRepository on operation getUserInfo', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(MockData.userPassenger);

    const result = await userService.getUserInfo('me3LaIM4YthvHc40A4v9I1CgbKo21111');

    expect(result.email).toEqual('joao.carlos@email.com');
    expect(result.name).toEqual('João Carlos Almeida');
    expect(result.isPassenger).toEqual(true);
    expect(result.cpf).toEqual('382.371.580-16');
    expect(result.uid).toEqual('me3LaIM4YthvHc40A4v9I1CgbKo21111');
    expect(Array.isArray(result.linkedVehicles)).toEqual(true);
    expect(result.linkedVehicles.includes('IBCM2789')).toEqual(true);
  });

  it('should return a error 404 user not found on getUserInfo', async () => {
    try {
      await userService.getUserInfo('me3LaIM4YthvHc40A4v9I1CgbKo21111');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('should return a created passenger user on function createUser', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(undefined);

    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await userService.createUser(MockData.userPassenger);

    expect(result.email).toEqual('joao.carlos@email.com');
    expect(result.name).toEqual('João Carlos Almeida');
    expect(result.isPassenger).toEqual(true);
    expect(result.cpf).toEqual('382.371.580-16');
    expect(result.uid).toEqual('me3LaIM4YthvHc40A4v9I1CgbKo21111');
    expect(Array.isArray(result.linkedVehicles)).toEqual(true);
    expect(result.linkedVehicles.includes('IBCM2789')).toEqual(true);
  });

  it('should return a error on function createUser', async () => {
    try {
      await userService.createUser(MockData.userPassenger);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return a error on function createUser', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(MockData.userPassenger);

    try {
      await userService.createUser(MockData.userPassenger);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return a created company user on function createUser', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(undefined);

    userRepository.registerUser = jest.fn().mockImplementation();

    const result = await userService.createUser(MockData.userCompany);

    expect(result.email).toEqual('bustur@email.com');
    expect(result.name).toEqual('Bus Tur');
    expect(result.isPassenger).toEqual(false);
    expect(result.cnpj).toEqual('26.597.052/0001-80');
    expect(result.uid).toEqual('me3LaIM4Ytasasasa0A4v9I1CgbKo21111');
    expect(Array.isArray(result.linkedVehicles)).toEqual(true);
    expect(result.linkedVehicles.includes('IBCM2789')).toEqual(true);
  });

  it('should return a error on function createUser', async () => {
    const mockUserInvalidCpf = MockData.userPassenger;
    mockUserInvalidCpf.cpf = 'xxx';

    try {
      await userService.createUser(mockUserInvalidCpf);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return a error on function createUser', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(undefined);

    const mockUserInvalidCpf = MockData.userPassenger;
    mockUserInvalidCpf.cpf = '';

    try {
      await userService.createUser(mockUserInvalidCpf);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should return a error on function createUser', async () => {
    userRepository.getUserByUid = jest.fn().mockResolvedValueOnce(undefined);

    const mockUserInvalidCnpj = MockData.userCompany;
    mockUserInvalidCnpj.cnpj = '';

    try {
      await userService.createUser(mockUserInvalidCnpj);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });
});
