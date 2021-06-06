/* eslint-disable class-methods-use-this */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CompanyController {
  @Get()
  public getHello(): string {
    return 'test';
  }
}
