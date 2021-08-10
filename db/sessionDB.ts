import { client } from './db';

const dbName = process.env.DB_NAME;

export const session = client.db(dbName).collection('session');
session.createIndex({ sessionToken: 1 });
