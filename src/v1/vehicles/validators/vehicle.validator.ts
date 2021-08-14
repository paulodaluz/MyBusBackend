import { IsString, Min, Max, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { BusStations, Vehicle } from '../interfaces/vehicle.interface';

export class RegisterVehicleValidator implements Vehicle {
  @IsString()
  registrationPlate: string;

  @IsString()
  name: string;

  @IsString()
  idToPassengers: string;

  @IsBoolean()
  isPublic: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  priceTransport: number;

  @IsBoolean()
  airConditioning: boolean;

  @IsBoolean()
  washrooms: boolean;

  @IsBoolean()
  wifi: boolean;

  @IsBoolean()
  suportWheelchair: boolean;

  @IsArray()
  busStations: Array<BusStations>;
}
