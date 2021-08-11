import { getUserFromCookies } from '../auth/account/user';
import { Layout } from '../components/layout';
import { connectDB } from '../db/db';
import MapIcon from '../icons/MapIcon';
import PlusIcon from '../icons/PlusIcon';

const CourseCard = ({
  children, className = '', background = 'bg-primaryDark', text = 'text-primaryText',
}) => (
  <div className="w-1/3 p-1 md:w-1/6 relative">
    <div className="aspect-ratio-square" />
    <div className={`${className} absolute inset-0 p-1 md:p-1`}>
      <div className={`${background} ${text} flex justify-center items-center flex-col rounded-md w-full h-full`}>
        {children}
      </div>
    </div>
  </div>
);

const Dashboard = ({ accountInfo }) => (
  <Layout pageTitle="Dashboard">
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello,
          {' '}
          {accountInfo?.name?.first}
        </h1>
      </div>
    </header>
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* <div className="border-0 border-b-2 border-primaryDark pb-1 m-2 md:m-0 md:p-0 md:pb-0">
        <h2 className="text-2xl">Recent Games</h2>
      </div> */}
      <div className=" pt-2 pb-1 m-2 md:m-0 md:p-0 md:pb-0">
        <div className="border-0 border-b-2 border-primaryDark">
          <h2 className="text-2xl">Courses</h2>
        </div>
        <div className="flex flex-wrap mt-1">
          <CourseCard
            background="bg-green-500"
            text="text-white"
          >
            <PlusIcon
              className="h-2/5 md:h-1/2"
            />
            <h3>New Course</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
          <CourseCard>
            <MapIcon className="h-2/5 md:h-1/2" />
            <h3>Course 1</h3>
          </CourseCard>
        </div>
      </div>
    </div>
  </Layout>
);

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
        name: user?.name,
      },
    }, // will be passed to the page component as props
  };
}

export default Dashboard;
