import { createSession } from '../session';
import { refreshTokens } from './user';

export async function logUserIn(userID, req, reply) {
  const connectionInfo = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };

  // Create Session
  const sessionToken = await createSession(userID, connectionInfo);
  // console.log('sessionToken',sessionToken)

  // Create JWT
  // Set Cookie
  await refreshTokens(sessionToken, userID, reply);
}
