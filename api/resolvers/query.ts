// @ts-ignore
import { QueryResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';

const userProfile = {
  id: String(1),
  name: {
    first: 'John',
    last: 'Smith',
  },
  email: {
    address: 'john@smith.com',
    verified: true,
  },
};

const Query: Required<QueryResolvers<ResolverContext>> = {
  async viewer(_parent, _args, _context, _info) {
    return userProfile;
  },
};

export default Query;
