import DatabaseInterface from "../../interfaces/database.interface";
import mongoose from "mongoose";

class MongoDbConnection implements DatabaseInterface {
    async createConnection(port: number): Promise<void> {
        try {
            await mongoose.connect(`mongodb://mongo:${port}/httpbinService`, {});
            console.log('MongoDB connected');
        } catch (err) {
            console.error('Database connection error:', err);
        }
    }

}

export default MongoDbConnection;