/* eslint-disable react/no-unescaped-entities */
import { useState, Fragment } from 'react';
import { signup } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import logo from '../assets/logo black svg.svg';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTherapist, setIsTherapist] = useState(false);

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password, firstName, lastName, isTherapist };

    try {
      await signup(user);

      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setIsTherapist(false);

      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
        navigate('/login');
      }, 5000);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.log('Error signup', error);
      // this chain gets the error message we defined in the backend
      setError(error.response.data.message);
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex w-full flex-col'>
          <a href='/' className='-m-1.5 p-1.5'>
            <img
              className='mx-auto h-10 w-auto'
              src={logo}
              alt='Find My Therapist'
            />
          </a>
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Register for Free
          </h2>
          <div className='mt-10 sm:mx-auto sm:w-full'>
            <div className='bg-white py-8 shadow sm:rounded-lg sm:px-12'>
              <Tabs
                size='md'
                fullWidth='true'
                aria-label='Options'
                variant='underlined'
                selectedKey={isTherapist ? 'therapist' : 'client'}
                onSelectionChange={newKey =>
                  setIsTherapist(newKey === 'therapist')
                }
              >
                <Tab key='client' title="I'm a Client">
                  <Card>
                    <CardBody>
                      <form
                        className='flex flex-col gap-4 h-auto bg-white '
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <label
                            htmlFor='firstName'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            First name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='firstName'
                              name='firstName'
                              type='text'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='lastName'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Last name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='lastName'
                              name='lastName'
                              type='text'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setLastName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Email address
                          </label>
                          <div className='mt-2'>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              autoComplete='email'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor='password'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Password
                          </label>
                          <div className='mt-2'>
                            <input
                              id='password'
                              name='password'
                              type='password'
                              autoComplete='current-password'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <button
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Create a Client Account
                        </button>
                      </form>
                      {error && <p>{error}</p>}
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key='therapist' title="I'm a Therapist">
                  <Card>
                    <CardBody>
                      <form
                        className='flex flex-col gap-4 h-auto'
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <label
                            htmlFor='firstName'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            First name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='firstName'
                              name='firstName'
                              type='text'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='lastName'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Last name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='lastName'
                              name='lastName'
                              type='text'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setLastName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Email address
                          </label>
                          <div className='mt-2'>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              autoComplete='email'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor='password'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Password
                          </label>
                          <div className='mt-2'>
                            <input
                              id='password'
                              name='password'
                              type='password'
                              autoComplete='current-password'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              onChange={e => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        {error && (
                          <p className='mb-4 text-xs italic'>{error}</p>
                        )}
                        <button
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Create a Therapist Account
                        </button>
                      </form>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className='py-5'>
          <p className='text-center text-small'>
            Already have an account?
            <br />
            <Link to='/login' size='sm'>
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end mt-16'>
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <CheckCircleIcon
                      className='h-6 w-6 text-green-400'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>
                      Account successfully created!
                    </p>
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default Signup;
