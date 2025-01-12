import mongoose from 'mongoose';

class MongoDbConnection {
  private static connected: boolean = false;

  static async createConnection(port: number, schema: string) {
    try {
      await mongoose.connect(`mongodb://mongo:${port}/${schema}`, {}).then(() => {
        this.connected = true;
      });

      return true;
    } catch (err) {
      console.error('Database connection error:', err);
      this.connected = false;
    }

    return this.connected;
  }
}

export default MongoDbConnection;
