import { useState } from 'react';
import { Layout } from '../components/layout';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createAccount(e) {
    try {
      e.preventDefault();

      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout pageTitle="Create Account">
      <div>
        <div className="min-h-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/img/icon.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => createAccount(e)}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form
                        action="#"
                        method="POST"
                      >
                        <div className="shadow overflow-hidden sm:rounded-md">
                          <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-s"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="last-name"
                                  id="last-name"
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-s"
                                />
                              </div>

                              <div className="col-span-6">
                                <label
                                  htmlFor="email-address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email address
                                </label>
                                <input
                                  type="text"
                                  name="email-address"
                                  id="email-address"
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6">
                                <label
                                  htmlFor="new-password"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Password
                                </label>
                                <input
                                  type="text"
                                  name="new-password"
                                  id="new-password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm"
                                />
                              </div>
                              {/*
                              <div className="col-span-6">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Country / Region
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>

                              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm  "
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State / Province
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  id="state"
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm  "
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="postal-code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  ZIP / Postal
                                </label>
                                <input
                                  type="text"
                                  name="postal-code"
                                  id="postal-code"
                                  className="mt-1 border-0 border-b-2 border-primary block w-full shadow-sm sm:text-sm  "
                                />
                              </div>
                             */}
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryLight"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: solid/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-primaryDark group-hover:text-primaryLight"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
