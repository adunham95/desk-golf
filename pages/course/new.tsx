import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { Container } from '../../components/container';
import { Layout } from '../../components/layout';
import { PageHeader } from '../../components/pageHeader';
import { CREATE_COURSE } from '../../api/hooks/courses';
import { connectDB } from '../../db/db';
import { getUserFromCookies } from '../../auth/account/user';

const NewCourse = (props) => {
  const [courseName, setCourseName] = useState('');
  const [holes, setHoles] = useState('18');
  const [createCourse] = useMutation(CREATE_COURSE);

  function createAccount(e) {
    e.preventDefault();
    createCourse({
      variables: { name: courseName, holes: parseInt(holes, 10) },
    });
  }
  return (
    <Layout>
      <PageHeader text="New Course" />
      <Container>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => createAccount(e)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6">
                          <label
                            htmlFor="course-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Course Name
                          </label>
                          <input
                            type="text"
                            name="course-name"
                            id="course-name"
                            onChange={(e) => setCourseName(e.target.value)}
                            className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="course-holes"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Number of Holes
                          </label>
                          <input
                            type="number"
                            name="course-holes"
                            id="course-holes"
                            onChange={(e) => setHoles(e.target.value)}
                            className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm"
                          />
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryLight"
            >

              Create Course
            </button>
          </div>
        </form>
      </Container>
    </Layout>
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

export default NewCourse;
