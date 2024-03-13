import { useState, useContext } from 'react';
import { login } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

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
    <div>
      <h1>Login</h1>

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

        <button type='submit'>Login</button>
      </form>

      {error && <p>{error}</p>}

      <p>Don't have an account yet?</p>
      <Link to='/signup'>
        <p>Signup</p>
      </Link>
    </div>
  );
}

export default Login;
