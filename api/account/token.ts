import JWT from 'jsonwebtoken';
// const { JWT } = JsonWebToken;

const JWTSignature = process.env.JWT_SIGNATURE || '';

export async function createToken(sessionToken, userID) {
  try {
    // Create Refresh token
    // Session ID
    const refreshToken = JWT.sign({
      sessionToken,
    }, JWTSignature);
    // Create Access Token
    // Session ID
    // User ID
    const accessToken = JWT.sign({
      sessionID: sessionToken,
      userID,
    }, JWTSignature);
    // Return refresh token & access token
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('e', error);
    return { accessToken: '', refreshToken: '' };
  }
}
