import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import { createToken } from './token';

const { genSalt, hash } = bcrypt;

export async function registerUser(email: string, password: string, name: {first: string, last: string}) {
  const { user } = await import('../userDB');

  // generate slat
  const salt = await genSalt(10);

  // hash with salt
  const hashedPW = await hash(password, salt);

  // store in DB.js
  const result = await user.insertOne({
    email: {
      address: email,
      verified: false,
    },
    name,
    password: hashedPW,
  });

  // return user
  return result.insertedId;
}

export async function refreshTokens(sessionToken, userID, reply) {
  try {
    const { accessToken, refreshToken } = await createToken(sessionToken, userID);

    const now = new Date();
    const refreshExpires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
    console.log(refreshExpires);

    reply.setHeader('Set-Cookie',
      cookie.serialize('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })).setHeader('Set-Cookie',
      cookie.serialize('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: refreshExpires,
      }));
  } catch (error) {
    console.error(error);
  }
}
