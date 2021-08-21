import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorUtils } from '../../../src/v1/utils/error.utils';

describe('Test utils Errors - throwError(err)', () => {
  it('should be able return error 400.', () => {
    try {
      ErrorUtils.throwError(new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST));
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should be able return error 403.', () => {
    try {
      ErrorUtils.throwError(new HttpException('PERMISSION_DENIED', HttpStatus.FORBIDDEN));
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have sufficient permission.');
      expect(error.message).toBe('Client does not have sufficient permission.');
    }
  });

  it('should be able return error 404.', () => {
    try {
      ErrorUtils.throwError(
        new HttpException('The specified resource is not found.', HttpStatus.NOT_FOUND),
      );
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should be able return error 500.', () => {
    try {
      ErrorUtils.throwError(
        new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should be able return error 500.', () => {
    try {
      ErrorUtils.throwError(new Error('error'));
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should be able return error 504.', () => {
    try {
      ErrorUtils.throwError(new HttpException('TIMEOUT', HttpStatus.GATEWAY_TIMEOUT));
    } catch (error) {
      expect(error.status).toBe(504);
      expect(error.response).toBe('Request timeout exceeded.');
      expect(error.message).toBe('Request timeout exceeded.');
    }
  });
});

describe('Test utils Errors - throwSpecificError(response: number)', () => {
  it('should be able return error 400.', () => {
    try {
      ErrorUtils.throwSpecificError(400);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
      expect(error.message).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('should be able return error 403.', () => {
    try {
      ErrorUtils.throwSpecificError(403);
    } catch (error) {
      expect(error.status).toBe(403);
      expect(error.response).toBe('Client does not have sufficient permission.');
      expect(error.message).toBe('Client does not have sufficient permission.');
    }
  });

  it('should be able return error 404.', () => {
    try {
      ErrorUtils.throwSpecificError(404);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
      expect(error.message).toBe('The specified resource is not found.');
    }
  });

  it('should be able return error 500.', () => {
    try {
      ErrorUtils.throwSpecificError(500);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toBe('Unknown server error. Typically a server bug.');
      expect(error.message).toBe('Unknown server error. Typically a server bug.');
    }
  });

  it('should be able return error 504.', () => {
    try {
      ErrorUtils.throwSpecificError(504);
    } catch (error) {
      expect(error.status).toBe(504);
      expect(error.response).toBe('Request timeout exceeded.');
      expect(error.message).toBe('Request timeout exceeded.');
    }
  });
});
