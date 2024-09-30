import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

interface GlobalWithMongoose extends Global {
  mongoose?: MongooseConnection;
}

const cached: MongooseConnection = (global as GlobalWithMongoose).mongoose || {
  conn: null,
  promise: null
};

if (!(global as GlobalWithMongoose).mongoose) {
  (global as GlobalWithMongoose).mongoose = cached;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = cached.promise || 
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',
      bufferCommands: false
    });

  cached.conn = await cached.promise;
  return cached.conn;
};