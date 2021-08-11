import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { createToken } from './token';

const { genSalt, hash } = bcrypt;
const JWTSignature: string = process.env.JWT_SIGNATURE || '';

export async function registerUser(email: string, password: string, name: {first: string, last: string}) {
  const { user } = await import('../../db/userDB');

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

export async function getUserFromCookies(req, reply) {
  try {
    const { user } = await import('../../db/userDB');
    const { session } = await import('../../db/sessionDB');
    const cookies = cookie.parse(req.headers.cookie || '');
    // Check tokens exist
    if (cookies?.accessToken) {
      // If access token exits
      const { accessToken } = req.cookies;
      // Decode token
      const decodedAccessToken: any = JWT.verify(accessToken, JWTSignature);
      console.log(decodedAccessToken);
      // Return user
      const userAccount = await user.findOne({
        _id: new ObjectId(decodedAccessToken?.userID),
      });
      return userAccount;
    }
    if (cookies?.refreshToken) {
      const { refreshToken } = req.cookies;
      // @ts-ignore
      const { sessionToken } = JWT.verify(refreshToken, JWTSignature);
      // Look up session
      const currentSession = await session.findOne({ sessionToken });
      if (currentSession?.valid) {
        const currentUser = await user.findOne({
          _id: new ObjectId(currentSession.userID),
        });
        await refreshTokens(sessionToken, currentUser?._id, reply);
        return currentUser;
      }
    }
    return { userID: '' };
  } catch (error) {
    console.error(error);
    return { userID: '' };
  }
}
