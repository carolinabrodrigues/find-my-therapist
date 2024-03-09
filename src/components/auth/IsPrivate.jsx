/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsPrivate = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if the authentication is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    // if the user is not logged in, go to login page
    return <Navigate to='/login' />;
  } else {
    // if the user is logged in, allow it to see the page that is inside this component
    return props.children;
  }
};

export default IsPrivate;
