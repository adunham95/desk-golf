import { ApolloServer } from 'apollo-server-micro';
import { client } from '../../db/db';
import { schema } from '../../api/schema';

let db;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        // @ts-ignore
        // if (!client.isConnected()) await client.connect();
        await client.connect();
        db = client.db('admin'); // database name

        console.log('🗄  Connected to DB success');
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e);
      }
    }

    return { db };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
