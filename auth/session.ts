import { randomBytes } from 'crypto';

export async function createSession(userID, connection) {
  try {
    // Generate session token
    const sessionToken = randomBytes(43).toString('hex');
    // Retrieve connection information
    // User agent, IP
    const { ip, userAgent } = connection;
    // Database create session
    const { session } = await import('./session/session');
    await session.insertOne({
      sessionToken,
      userID,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    // Return session token
    return sessionToken;
  } catch (e) {
    throw new Error('Session creation failed');
  }
}
