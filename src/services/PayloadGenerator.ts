export default class PayloadGenerator {
  public static generate(): Record<string, unknown> {
    return {
      name: `User${Math.floor(Math.random() * 1000)}`,
      age: Math.floor(Math.random() * 100),
      isActive: Math.random() > 0.5,
      createdAt: new Date().toISOString(),
    };
  }
}
