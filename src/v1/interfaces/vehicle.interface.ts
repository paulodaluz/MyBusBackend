export interface BusStations {
  stationName: string;
  latitude: number;
  longitude: number;
}
export interface Vehicle {
  registrationPlate: string;
  name: string;
  idToPassengers: string;
  isPublic: boolean;
  priceTransport: number;
  airConditioning: boolean;
  washrooms: boolean;
  wifi: boolean;
  suportWheelchair: boolean;
  passwordToShareLocalization?: boolean;
  busStations: Array<BusStations>;
}
