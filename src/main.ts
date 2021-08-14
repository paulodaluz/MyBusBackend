import { NestFactory } from '@nestjs/core';
import { VehicleModule } from './v1/vehicle.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;

  const app = await NestFactory.create(VehicleModule);

  app.setGlobalPrefix(String(process.env.APPLICATION_PREFIX));
  await app.listen(port);
}

bootstrap();
