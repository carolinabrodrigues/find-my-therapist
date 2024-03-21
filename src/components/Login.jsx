import { useState, useContext } from 'react';
import { login } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password };

    try {
      // login responds with the jwt token
      const response = await login(user);

      // console.log(response.data.authToken); // -> token

      // we need to storage the token in the browser local storage - using the function
      storeToken(response.data.authToken);
      authenticateUser();

      navigate('/user');
    } catch (error) {
      console.log('Error login', error);
      // this chain gets the error message we defined in the backend
      setError(error.response.data.message);
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex w-full flex-col'>
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Login
          </h2>
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
            <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
              <form
                className='flex flex-col gap-4 h-[200px] bg-white'
                onSubmit={handleSubmit}
              >
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
                  Login
                </button>
              </form>
              {error && <p className='py-1'>{error}</p>}
            </div>
          </div>
        </div>
        <div className='py-5'>
          <p className='text-center text-small'>
            Don't have an account yet?
            <br />
            <Link to='/signup' size='sm'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
