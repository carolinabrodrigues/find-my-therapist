/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { signup } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTherapist, setIsTherapist] = useState(false);

  const [error, setError] = useState(null);

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

      navigate('/login');
    } catch (error) {
      console.log('Error signup', error);
      // this chain gets the error message we defined in the backend
      setError(error.response.data.message);
    }
  };

  console.log('is therapist', isTherapist);

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex w-full flex-col'>
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Register for Free
          </h2>
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
            <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
              <Tabs
                className='carol'
                aria-label='Options'
                variant='underlined'
                selectedKey={isTherapist ? 'therapist' : 'client'}
                onSelectionChange={newKey =>
                  setIsTherapist(newKey === 'therapist')
                }
                style={{ backgroundColor: 'white' }}
              >
                <Tab key='client' title="I'm a Client">
                  <Card>
                    <CardBody>
                      <form
                        className='flex flex-col gap-4 h-[360px] bg-white'
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
                          Create Account
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
                        className='flex flex-col gap-4 h-[360px]'
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
                              type='firstName'
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
                              type='lastName'
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
                          Sign in
                        </button>
                      </form>
                      {error && <p>{error}</p>}
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
    </div>
  );
}

export default Signup;
