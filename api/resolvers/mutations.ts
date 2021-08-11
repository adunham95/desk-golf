// @ts-ignore
import { MutationResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';
import { updateProfile } from './user/updateProfile';

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async updateName(_parent, _args, _context, _info) {
    return updateProfile(_args);
  },
};

export default Mutation;
