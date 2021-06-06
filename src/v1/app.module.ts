import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [],
})
export class AppModule {}
