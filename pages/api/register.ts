import { parseBody } from 'next/dist/next-server/server/api-utils';
import { registerUser } from '../../api/account/user';
import { connectDB } from '../../api/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    console.log(req.body);
    const userID = await registerUser(req.body.email, req.body.password, { first: req.body.firstName, last: req.body.lastName });
    console.log(userID);
    res.send({
      status: 'SUCCESS',
      userID,
      data: 'User Logged In',
    });
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
