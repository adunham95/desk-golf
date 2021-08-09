import bcrypt from 'bcryptjs';
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
  const rootDomain = process.env.ROOT_DOMAIN;
  try {
    const { accessToken, refreshToken } = await createToken(sessionToken, userID);

    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);
    reply.setCookie('accessToken', accessToken, {
      path: '/',
      domain: rootDomain,
      httpOnly: true,
      secure: true,
    }).setCookie('refreshToken', refreshToken, {
      path: '/',
      domain: rootDomain,
      httpOnly: true,
      secure: true,
      expires: refreshExpires,
    });
  } catch (error) {
    console.error(error);
  }
}
