/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { addProfile } from '../api/matches.api';

const ProfileContext = createContext();

const ProfileProviderWrapper = props => {
  const [profile, setProfile] = useState(null);
  const [submittedProfile, setSubmittedProfile] = useState(null);
  const [page, setPage] = useState(1);

  const handleSubmit = async reqBody => {
    try {
      const newProfile = await addProfile(reqBody);
      setSubmittedProfile(newProfile);
      console.log('created profile');
    } catch (error) {
      setSubmittedProfile(error.response.data);
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        handleSubmit,
        page,
        setPage,
        submittedProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProviderWrapper };
