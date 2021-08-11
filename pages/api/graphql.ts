import { ApolloServer } from 'apollo-server-micro';
import { client } from '../../db/db';
import { schema } from '../../api/schema';
import { getUserFromCookies } from '../../auth/account/user';

let db;
let user;

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    if (!db) {
      try {
        // @ts-ignore
        // if (!client.isConnected()) await client.connect();
        await client.connect();
        db = client.db('admin'); // database name

        console.log('🗄  Connected to DB success');

        user = await getUserFromCookies(req, res);

        console.log('user', user);
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e);
      }
    }

    return { db, userID: user._id.toString() };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
