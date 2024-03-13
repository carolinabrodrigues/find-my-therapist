/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { signup } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'> Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor='password'> Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor='name'> First Name:</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor='name'> Last Name:</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        <label>
          <input
            type='checkbox'
            checked={isTherapist}
            onChange={() => setIsTherapist(!isTherapist)}
          />
          I'm a therapist
        </label>

        <button type='submit'>Sign Up</button>
      </form>

      {error && <p>{error}</p>}

      <p>Already have an account?</p>
      <Link to='/login'>
        <p>Login</p>
      </Link>
    </div>
  );
}

export default Signup;
