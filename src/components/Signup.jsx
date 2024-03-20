/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { signup } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Card, CardBody, Button, Input } from '@nextui-org/react';

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
    <div>
      <h1>Signup</h1>

      <div className='flex w-full flex-col'>
        <Tabs
          aria-label='Options'
          selectedKey={isTherapist ? 'therapist' : 'client'}
          onSelectionChange={newKey => setIsTherapist(newKey === 'therapist')}
        >
          <Tab key='client' title="I'm a Client">
            <Card>
              <CardBody>
                <form
                  className='flex flex-col gap-4 h-[300px]'
                  onSubmit={handleSubmit}
                >
                  <Input
                    isRequired
                    label='First Name'
                    placeholder='Enter your first name'
                    type='firstname'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Last Name'
                    placeholder='Enter your last name'
                    type='lastname'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Email'
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <p className='text-center text-small'>
                    Already have an account?{' '}
                    <Link to='/login' size='sm'>
                      Login
                    </Link>
                  </p>
                  <div className='flex gap-2 justify-end'>
                    <Button fullWidth color='primary' type='submit'>
                      Sign up
                    </Button>
                  </div>
                </form>
                {error && <p>{error}</p>}
              </CardBody>
            </Card>
          </Tab>
          <Tab key='therapist' title="I'm a Therapist">
            <Card>
              <CardBody>
                <form
                  className='flex flex-col gap-4 h-[300px]'
                  onSubmit={handleSubmit}
                >
                  <Input
                    isRequired
                    label='First Name'
                    placeholder='Enter your first name'
                    type='firstname'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Last Name'
                    placeholder='Enter your last name'
                    type='lastname'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Email'
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    isRequired
                    label='Password'
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <p className='text-center text-small'>
                    Already have an account?{' '}
                    <Link to='/login' size='sm'>
                      Login
                    </Link>
                  </p>
                  <div className='flex gap-2 justify-end'>
                    <Button fullWidth color='primary' type='submit'>
                      Sign up
                    </Button>
                  </div>
                </form>
                {error && <p>{error}</p>}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Signup;
