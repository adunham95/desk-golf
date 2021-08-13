import { authorizeUser } from '../../auth/account/authorize';
import { logUserIn } from '../../auth/account/logUserIn';
import { connectDB } from '../../db/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    try {
      console.log(req.body);
      const { isAuthorized, userID } = await authorizeUser(req.body.email, req.body.password);
      console.log({ isAuthorized, userID });
      if (isAuthorized) {
        await logUserIn(userID, req, res);
        res.send({
          status: 'SUCCESS',
          userID,
          data: 'User logged in',
        });
      }
    } catch (error) {
      console.error(error);
      res.send({
        status: 'FAILED',
        data: 'Failed Logging User in',
      });
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
