import { ObjectId } from 'mongodb';
import { connectDB } from '../../../db/db';
import { sanitize } from '../../../util/sanitize';

interface Profile{
    id: string,
    firstName?: string,
    lastName?: string,
    email: string
}

interface LooseObject {
    [key: string]: any
}

export async function updateProfile({
  id, firstName = '', lastName = '', email = '',
}: Profile) {
  // await connectDB();
  const { user } = await import('../../../db/userDB');

  const profile: LooseObject = {};

  if (firstName !== '') {
    profile['name.first'] = firstName;
  }

  if (lastName !== '') {
    profile['name.last'] = lastName;
  }

  if (email !== '') {
    profile['email.address'] = email;
  }

  // console.log(profile);

  // store in DB.js
  const result = await user.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: profile },
    { returnDocument: 'after' },
  );

  // console.log(result);

  return sanitize(result.value);
}
