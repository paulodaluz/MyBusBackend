export class Utils {
  public static generateRandomPassword(length: number): string {
    return Math.random().toString(36).slice(-length).toUpperCase();
  }

  public static isCpf(cpf: string): boolean {
    const cpfRegex = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);

    return cpfRegex.test(cpf);
  }

  public static isCnpj(cnpj: string): boolean {
    const cnpjRegex = new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);

    return cnpjRegex.test(cnpj);
  }
}
