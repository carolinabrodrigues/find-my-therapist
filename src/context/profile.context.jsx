/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { addProfile } from '../api/matches.api';

const ProfileContext = createContext();

const ProfileProviderWrapper = props => {
  const [profile, setProfile] = useState({});
  const [page, setPage] = useState(1);

  const handleSubmit = async reqBody => {
    try {
      await addProfile(reqBody);
      console.log('created profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, handleSubmit, page, setPage }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProviderWrapper };
