import { Utils } from '../../src/v1/vehicles/utils/utils.utils';

describe('Utils test', () => {
  it('should return a randoom password', async () => {
    const response = Utils.generateRandomPassword(9);

    expect(response.length).toBe(9);
    expect(typeof response).toBe('string');
  });
});
