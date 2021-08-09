import { MongoClient } from 'mongodb';

// const { MongoClient } = mongo;

const url = process.env.MONGO_URL || '';

export const client = new MongoClient(url, { useNewUrlParser: true });

export async function connectDB() {
  try {
    await client.connect();
    // Confirm connections
    await client.db('admin').command({ ping: 1 });

    console.log('🗄  Connected to DB success');
  } catch (error) {
    console.error(error);
    // If error close connection
    await client.close();
  }
}
