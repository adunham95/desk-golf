// @ts-ignore
import { MutationResolvers } from '../type-defs.graphqls';
import { ResolverContext } from '../apollo';
import { updateProfile } from './user/updateProfile';
import { newCourse } from './courses/newCourse';

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async updateName(_parent, _args, _context, _info) {
    return updateProfile(_args);
  },
  async createCourse(_parent, _args, _content, _info) {
    console.log('content', _content);
    return newCourse({ ..._args, id: _content.userID });
  },
};

export default Mutation;
