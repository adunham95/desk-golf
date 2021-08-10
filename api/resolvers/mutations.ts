// @ts-ignore
import { MutationResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';

const userProfile = {
  id: String(1),
  name: {
    first: 'John',
    last: 'Smith',
  },
  email: {
    address: 'john@smith.com',
    verified: false,
  },
};

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async updateName(_parent, _args, _context, _info) {
    console.log(_args);

    // userProfile.name = _args.name;
    return userProfile;
  },
};

export default Mutation;
