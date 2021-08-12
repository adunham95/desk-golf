import Link from 'next/link';
import { getMyCourses } from '../api/resolvers/courses/getMyCourses';
import { getUserFromCookies } from '../auth/account/user';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PageHeader } from '../components/pageHeader';
import { connectDB } from '../db/db';
import MapIcon from '../icons/MapIcon';
import PlusIcon from '../icons/PlusIcon';

const CourseCard = ({
  children, className = '', background = 'bg-primaryDark', text = 'text-primaryText', to = '',
}) => (
  <>
    {to === ''
      ? (
        <div className="w-1/3 p-1 md:w-1/6 relative">
          <div className="aspect-ratio-square" />
          <div className={`${className} absolute inset-0 p-1 md:p-1`}>
            <div className={`${background} ${text} flex justify-center items-center flex-col rounded-md w-full h-full`}>
              {children}
            </div>
          </div>
        </div>
      )
      : (
        <Link
          href={to}
          passHref
        >
          <a className="w-1/3 p-1 md:w-1/6 relative">
            <div className="aspect-ratio-square" />
            <div className={`${className} absolute inset-0 p-1 md:p-1`}>
              <div className={`${background} ${text} flex justify-center items-center flex-col rounded-md w-full h-full`}>
                {children}
              </div>
            </div>
          </a>
        </Link>
      )}
  </>
);

const Dashboard = ({ accountInfo, courses }) => (
  <Layout pageTitle="Dashboard">
    <PageHeader text={`Hello, ${accountInfo?.name?.first}`} />
    <Container>
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
            to="/course/new"
          >
            <PlusIcon
              className="h-2/5 md:h-1/2"
            />
            <h3>New Course</h3>
          </CourseCard>
          {
            courses.map((c) => (
              <CourseCard key={c.id}>
                <MapIcon className="h-2/5 md:h-1/2" />
                <h3>{c.name}</h3>
              </CourseCard>
            ))
          }
        </div>
      </div>
    </Container>
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

  const courses = await getMyCourses(user._id.toString());
  console.log(courses);

  return {
    props: {
      accountInfo: {
        name: user?.name,
      },
      courses: JSON.parse(JSON.stringify(courses)),
    }, // will be passed to the page component as props
  };
}

export default Dashboard;
