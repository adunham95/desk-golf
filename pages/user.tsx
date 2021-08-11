import React from 'react';
import { getUserFromCookies } from '../auth/account/user';
import { connectDB } from '../db/db';

const User = ({ accountInfo }) => {
  console.log();
  return (
    <div>
      <h1>
        {accountInfo?.name?.first}
        {' '}
        {accountInfo?.name?.last}
        {' '}
      </h1>
      <h2>
        Email:
        {accountInfo?.email?.address}
        {' '}
      </h2>
      <span>
        Verified Email:
        {' '}
        {accountInfo?.email?.verified ? 'True' : 'False'}
      </span>
    </div>
  );
};

export async function getServerSideProps(context) {
  await connectDB();
  const user = await getUserFromCookies(context.req, context.res);
  console.log(user);

  if (!user?._id) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      accountInfo: {
        email: user?.email,
        name: user?.name,
      },
    }, // will be passed to the page component as props
  };
}

export default User;
