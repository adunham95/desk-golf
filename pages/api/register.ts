import { doesEmailExist, registerUser } from '../../auth/account/user';
import { connectDB } from '../../db/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const userExists = doesEmailExist(req.body.email);
      if (userExists) {
        res.send({
          status: 'error',
          data: 'Error Creating Account',
          alt: 'Emails exists',
        });
      }
      const userID = await registerUser(req.body.email, req.body.password, { first: req.body.firstName, last: req.body.lastName });
      res.send({
        status: 'SUCCESS',
        userID,
        data: 'User Created',
      });
    } catch (error) {
      console.error('Register Error', error);
      res.send({
        status: 'ERROR',
        data: 'Could Not Login',
      });
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}

// try {
//   const userID = await registerUser(req.body.email, req.body.password);
//   console.log(userID);
//   if (userID) {
//     const emailLink = await createVerifyEmailLink(req.body.email);
//     await sendEmail({
//       to: req.body.email,
//       subject: 'Verify your Email',
//       html: `<a href="${emailLink}">Verify</a>`,
//     });
//     await logUserIn(userID, req, reply);
//     reply.send({
//       status: 'SUCCESS',
//       userID,
//       data: 'User Logged In',
//     });
//   }
// } catch (error) {
//   console.error(error);
//   reply.send({
//     status: 'FAILED',
//   });
// }
