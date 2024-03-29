/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const IsAnon = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isLoggedIn) {
    return <Navigate to='/user' />;
  } else {
    return props.children;
  }
};

export default IsAnon;
