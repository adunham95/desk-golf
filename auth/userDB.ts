import { client } from './db';

const dbName = process.env.DB_NAME;

console.log(dbName);

export const user = client.db(dbName).collection('user');
user.createIndex({ 'email.address': 1 });
