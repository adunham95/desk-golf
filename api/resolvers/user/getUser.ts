import { ObjectId } from 'mongodb';
import { connectDB } from '../../../db/db';
import { sanitize } from '../../../util/sanitize';

export async function getUserByID(id) {
  await connectDB();
  const { user } = await import('../../../db/userDB');
  // Look up user by id
  const userData = await user.findOne({
    _id: new ObjectId(id),
  });

  console.log(userData);

  return sanitize(userData);
}
