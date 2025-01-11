import mongoose from 'mongoose';

class MongoDbConnection {
  async createConnection(port: number, schema: string): Promise<void> {
    try {
      await mongoose.connect(`mongodb://mongo:${port}/${schema}`, {});
    } catch (err) {
      console.error('Database connection error:', err);
    }
  }
}

export default MongoDbConnection;
