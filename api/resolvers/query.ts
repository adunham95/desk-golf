// @ts-ignore
import { QueryResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';
import { getUserByID } from './user/getUser';
import { getMyCourses } from './courses/getMyCourses';

const Query: Required<QueryResolvers<ResolverContext>> = {
  async viewer(_parent, _args, _context, _info) {
    return getUserByID(_args.id);
  },
  async getCourses(_parent, _args, _context, _info) {
    return getMyCourses(_context.userID);
  },
};

export default Query;
