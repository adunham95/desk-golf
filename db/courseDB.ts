import { client } from './db';

const dbName = process.env.DB_NAME;

export const course = client.db(dbName).collection('course');
course.createIndex({ name: 1 });
