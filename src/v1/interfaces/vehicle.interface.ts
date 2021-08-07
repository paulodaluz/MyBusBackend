export interface RegisterVehicle {
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
  busStations: [
    {
      stationName: string;
      latitude: number;
      longitude: number;
    },
  ];
}
