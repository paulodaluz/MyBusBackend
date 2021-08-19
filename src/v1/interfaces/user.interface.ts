export interface User {
  email: string;
  name: string;
  isPassenger: boolean;
  uid: string;
  cpf?: number;
  cnpj?: number;
  linkedVehicles: Array<string>;
}
