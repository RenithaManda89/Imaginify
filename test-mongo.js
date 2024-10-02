import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

connectToMongoDB();
