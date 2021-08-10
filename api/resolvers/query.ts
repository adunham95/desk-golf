// @ts-ignore
import { QueryResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';
import { getUserByID } from './user/getUser';

const Query: Required<QueryResolvers<ResolverContext>> = {
  async viewer(_parent, _args, _context, _info) {
    return getUserByID(_args.id);
  },
};

export default Query;
