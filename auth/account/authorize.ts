import { compare } from 'bcryptjs';

export async function authorizeUser(email, password) {
  const { user } = await import('../../db/userDB');
  // Look up user
  const userData = await user.findOne({
    'email.address': email,
  });
  // Get user Password
  const savedPW = userData?.password;
  // Compare password with one in db
  const isAuthorized = await compare(password, savedPW);
  // Return boolean password correct
  return { isAuthorized, userID: userData?._id };
}
