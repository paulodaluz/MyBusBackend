export interface User {
  email: string;
  name: string;
  isPassenger: boolean;
  uid: string;
  cpf?: string;
  cnpj?: string;
  linkedVehicles: Array<string>;
}
