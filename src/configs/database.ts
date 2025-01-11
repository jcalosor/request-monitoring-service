import * as process from 'node:process';
import MongoDbConnection from '../connections/database/mongo-db.connection';

/**
 * Database abstraction and connection mapper.
 *
 * @param port
 * @param schema
 *
 * @return void
 */
const database: any = (port: number, schema: string) => {
  // This enables selection of db driver based on .env config
  switch (process.env.DB_DRIVER) {
    case 'mongodb':
      new MongoDbConnection().createConnection(port, schema).then(() => {
        console.log('Database connection created.');
      });
      break;

    default:
      throw new Error('Invalid database driver defined.');
  }
};

export default database;
