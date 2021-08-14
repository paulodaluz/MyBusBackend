export class Utils {
  public static generateRandomPassword(length: number): string {
    return Math.random().toString(36).slice(-length).toUpperCase();
  }
}
