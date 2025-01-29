import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { setMongoUri } from './server.config';

export default class TestDb {
  mongod = new MongoMemoryServer();

  connect = async () => {
    await this.mongod.start();
    const uri = this.mongod.getUri();
    setMongoUri(uri); //only in tests
    const mongooseOpts: mongoose.ConnectOptions = {
      dbName: 'test_db',
    };
    mongoose.set('strict', 'throw'); //Throw if we insert data not in schema (default silently dropped)
    mongoose.set('strictQuery', 'throw'); //Throw if we query data not in schema (default silently ignored)
    await mongoose.connect(uri, mongooseOpts);
  };

  close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  };

  clear = async () => {
    const collections = mongoose.connection.collections;
    const promises: any = [];
    for (const key in collections) {
      const collection = collections[key];
      promises.push(collection.deleteMany({}));
    }
    return Promise.all(promises);
  };
}
