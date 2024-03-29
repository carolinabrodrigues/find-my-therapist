import NavbarApp from '../components/NavbarApp';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/profile.context';
import { AuthContext } from '../context/auth.context';
import {
  getProfile,
  getUser,
  getMatchedProfile,
  addMatches,
} from '../api/matches.api.js';
import { MatchesContext } from '../context/matches.context.jsx';
import searchIcon from '../assets/search-icon-gray.svg';
import placeholder from '../assets/placeholderAvatar.svg';
import HTMLReactParser from 'html-react-parser';

function User() {
  const { profile, setProfile } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { matches, getUserMatches } = useContext(MatchesContext);

  const navigate = useNavigate();

  const [pendingProfiles, setPendingProfiles] = useState(null);
  const [acceptedProfiles, setAcceptedProfiles] = useState(null);

  // GET Profile by User.Profile
  // to make sure we always have the most updated info
  const getUserInfo = async id => {
    try {
      const response = await getUser(id);
      setUser(response.data);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfile = async id => {
    try {
      const response = await getProfile(id);
      setProfile(response.data);
      const profileData = response.data;
      return profileData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(user._id).then(response => {
      getUserProfile(response.profile).then(response => {
        // if there's no profile yet - redirect to Questions
        if (!response) {
          navigate('/questions');
        }
      });
    });
  }, []);

  // GET Matches by User
  useEffect(() => {
    getUserMatches(user._id);
  }, []);

  const getPendingProfiles = async () => {
    try {
      const pendingMatches = matches.filter(
        match => match.matchStatus === 'Accepted by Client'
      );

      let updatedPendingProfiles = [];

      for (let i = 0; i < pendingMatches.length; i++) {
        const response = await getMatchedProfile(
          user._id,
          pendingMatches[i]._id
        );
        updatedPendingProfiles.push(response.data);
        setPendingProfiles(updatedPendingProfiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAcceptedProfiles = async () => {
    try {
      const acceptedMatches = matches.filter(
        match => match.matchStatus === 'Accepted by Therapist'
      );

      let updatedAcceptedProfiles = [];

      for (let i = 0; i < acceptedMatches.length; i++) {
        const response = await getMatchedProfile(
          user._id,
          acceptedMatches[i]._id
        );
        updatedAcceptedProfiles.push(response.data);
        setAcceptedProfiles(updatedAcceptedProfiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.isTherapist) {
      getAcceptedProfiles();
    } else {
      getPendingProfiles();
      getAcceptedProfiles();
    }
  }, [matches]);

  const handleMatchesButton = async () => {
    try {
      await addMatches(user._id);
      navigate('/matchedprofiles');
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = profileId => {
    navigate(`/matchedprofiles/${profileId}`);
  };

  const showMatchesCards = user => {
    const showPendingMatches = matches.filter(
      match => match.matchStatus === 'Accepted by Client'
    );

    if (user.isTherapist) {
      // IF THERAPIST
      return (
        <>
          <h2 className='text-2xl text-semibold mt-8 mb-4'>Pending Matches</h2>
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-gray-300' />
            </div>
          </div>
          <div className='flex justify-between align-center items-baseline'>
            <p className='text-xl my-16'>
              You have {showPendingMatches.length}{' '}
              {showPendingMatches.length === 1 ? (
                <span>match</span>
              ) : (
                <span>matches</span>
              )}{' '}
              waiting for your review
            </p>
            {showPendingMatches.length > 0 && (
              <button
                type='button'
                className='rounded-md bg-white px-3.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              >
                <Link to='/matchedprofiles'>Review pending matches</Link>
              </button>
            )}
          </div>

          {acceptedProfiles && (
            <>
              <h2 className='text-2xl text-semibold mt-8 mb-4'>
                Accepted Matches
              </h2>
              <div className='relative'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-300' />
                </div>
              </div>

              <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-12 mt-10'>
                {acceptedProfiles.map(profile => {
                  return (
                    <div
                      key={profile._id}
                      className='overflow-hidden rounded-lg bg-white shadow'
                    >
                      <div className='bg-white px-4 py-3 sm:p-4 flex flex-col justify-center gap-2'>
                        {profile.picture ? (
                          HTMLReactParser(profile.picture)
                        ) : (
                          <img src={placeholder} className='rounded-lg' />
                        )}
                        <h3 className='text-bold'>
                          {profile.user.firstName} {profile.user.lastName}
                        </h3>
                        <p className='mb-3'>{profile.location}</p>
                        <button
                          onClick={() => handleView(profile._id)}
                          className='rounded-full w-full bg-indigo-600 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className='my-24'>
            <p className='mb-5'>Not enough matches?</p>
            <button
              type='button'
              className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            >
              <Link to='/myprofile'>Edit your preferences</Link>
            </button>
          </div>
        </>
      );
    } else {
      // IF CLIENT
      return (
        <>
          <h3 className='text-2xl text-bold mt-8 mb-4'>Your Matches</h3>
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-gray-300' />
            </div>
          </div>
          {matches.length > 0 && (
            <>
              {pendingProfiles && (
                <>
                  <h3 className='text-xl text-bold mt-10 mb-4'>
                    Waiting for response
                  </h3>
                  <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-12'>
                    {pendingProfiles.map(profile => {
                      return (
                        <div
                          key={profile._id}
                          className='overflow-hidden rounded-lg bg-white shadow'
                        >
                          <div className='bg-white px-4 py-3 sm:p-4 flex flex-col justify-center gap-2'>
                            {profile.picture ? (
                              HTMLReactParser(profile.picture)
                            ) : (
                              <img src={placeholder} className='rounded-lg' />
                            )}
                            <h3 className='text-bold'>
                              {profile.user.firstName} {profile.user.lastName}
                            </h3>
                            <p className='mb-3'>{profile.location}</p>
                            <button
                              onClick={() => handleView(profile._id)}
                              className='rounded-full w-full bg-indigo-600 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                              View
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {acceptedProfiles && (
                <>
                  <h3 className='text-xl text-bold mt-10 mb-4'>
                    Accepted matches
                  </h3>

                  <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-12'>
                    {acceptedProfiles.map(profile => {
                      return (
                        <div
                          key={profile._id}
                          className='overflow-hidden rounded-lg bg-white shadow'
                        >
                          <div className='bg-white px-4 py-3 sm:p-4 flex flex-col justify-center gap-2'>
                            {profile.picture ? (
                              HTMLReactParser(profile.picture)
                            ) : (
                              <img src={placeholder} className='rounded-lg' />
                            )}
                            <h3 className='text-bold'>
                              {profile.user.firstName} {profile.user.lastName}
                            </h3>
                            <p className='mb-3'>{profile.location}</p>
                            <div className='flex h-min justify-center gap-1'>
                              <button
                                onClick={() => handleView(profile._id)}
                                className='rounded-full bg-zinc-200 w-full py-1 text-sm font-semibold shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                              >
                                View
                              </button>
                              <button className='rounded-full bg-indigo-600 w-full py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                <Link to={profile.calendarLink}>Book</Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div className='flex justify-between pt-16 align-center'>
                {pendingProfiles || acceptedProfiles ? (
                  <p className='p-2'>Looking for new suggestions?</p>
                ) : (
                  <p className='p-2'>You have matches to review</p>
                )}
                <button
                  onClick={handleMatchesButton}
                  className='rounded-md bg-white px-10 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Check new matches ⚡️
                </button>
              </div>
            </>
          )}

          {/* No matches yet */}
          {matches.length === 0 && (
            <div className='text-center mt-10 relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
              <img src={searchIcon} className='mx-auto h-12 w-12' />
              <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                No matches yet{' '}
              </h3>
              <span className='mt-1 text-sm text-gray-500'>
                Get started by looking for matches
              </span>
              <div className='mt-6'>
                <button
                  type='button'
                  onClick={handleMatchesButton}
                  className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Get Matches
                </button>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <NavbarApp />
      <div className='relative isolate overflow-hidden pt-14'>
        <div className='mx-auto max-w-7xl px-6 py-12 sm:py-12 lg:px-8'>
          <div className='mx-auto max-w-6xl lg:mx-0 '>
            <h1 className='text-4xl font-bold my-5'>
              Welcome back, {user.firstName}
            </h1>
            {profile && matches && showMatchesCards(user)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
