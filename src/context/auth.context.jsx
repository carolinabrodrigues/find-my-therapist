/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { verify } from '../api/auth.api';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // we need to storage the token in the browser local storage - creating the function
  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    // get token from localStorage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const response = await verify(storedToken);
        const user = response.data;

        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        // if the server cannot authenticate the jwt
        console.log('Error occurred authenticating the user', error);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      // if token is not available
      setUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logoutUser = () => {
    // clear the localStorage
    removeToken();
    // update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setUser,
        storeToken,
        authenticateUser,
        logoutUser,
        props,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
