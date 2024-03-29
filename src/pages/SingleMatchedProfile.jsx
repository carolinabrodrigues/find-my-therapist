/* eslint-disable no-undef */
import NavbarApp from '../components/NavbarApp';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, getProfile } from '../api/matches.api';
import HTMLReactParser from 'html-react-parser';
import placeholder from '../assets/placeholderAvatar.svg';
import homeButton from '../assets/back-home-button.svg';

function SingleMatchedProfile() {
  const { user, setUser } = useContext(AuthContext);

  const { profileId } = useParams();

  const [matchedProfile, setMatchedProfile] = useState(null);

  const navigate = useNavigate();

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

  const getMatchedProfile = async id => {
    try {
      const response = await getProfile(id);
      setMatchedProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(user._id);
    getMatchedProfile(profileId);
  }, [user._id, profileId]);

  const showProfile = user => {
    const handleBackHome = () => {
      navigate('/user');
    };

    if (user.isTherapist) {
      return (
        <>
          <div className='overflow-hidden rounded-lg bg-indigo-100 shadow'>
            <div className='px-8 py-6 sm:px-8 sm:py-6'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col justify-center'>
                  <h2 className='text-indigo-800 font-bold text-xl mb-8'>
                    {matchedProfile.user.firstName}{' '}
                    {matchedProfile.user.lastName}
                  </h2>
                  <div>
                    {matchedProfile.therapySetup.includes('Online') ? (
                      <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600 mr-3'>
                        Online
                      </span>
                    ) : (
                      <span></span>
                    )}
                    <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600'>
                      {matchedProfile.location}
                    </span>
                  </div>
                </div>
                <div className='avatar-icon mb-4 sm:mb-0 sm:mr-4 h-32 w-32 rounded-full'>
                  {matchedProfile.picture ? (
                    HTMLReactParser(matchedProfile.picture)
                  ) : (
                    <img src={placeholder} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-6 xs:grid-cols-1 mt-10'>
            <div className='overflow-hidden rounded-xl shadow h-min'>
              <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                <h3 className='text-white font-bold'>Preferences</h3>
              </div>

              <div className='px-4 py-5 sm:p-6 bg-white'>
                <span className='font-semibold'>Price per Session</span>
                <p className='mb-5'>Up to {matchedProfile.price}€</p>
                <span className='font-semibold'>Psychological Approach</span>
                {matchedProfile.psyApproach.map(approach => {
                  return <p key={approach.id}>{approach}</p>;
                })}
              </div>
            </div>

            <div>
              <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow mb-6'>
                <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                  <h3 className='text-white font-bold'>Personal Details</h3>
                </div>
                <div className='px-4 py-5 sm:p-6'>
                  <span className='font-semibold'>Age</span>
                  <p className='mb-5'>{matchedProfile.age} years old</p>
                  <span className='font-semibold'>Gender</span>
                  <p>{matchedProfile.gender}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute top-[50%] right-5'>
            <button onClick={handleBackHome}>
              <img className='w-14' src={homeButton} alt='home icon' />
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='overflow-hidden rounded-lg bg-indigo-100 shadow'>
            <div className='px-8 py-10 sm:px-8 sm:py-10'>
              <div className='flex flex-row justify-between'>
                <div>
                  <h2 className='text-indigo-800 font-bold text-xl mb-6'>
                    {matchedProfile.user.firstName}{' '}
                    {matchedProfile.user.lastName}
                  </h2>

                  {matchedProfile.therapySetup.includes('Online') ? (
                    <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600 mr-3'>
                      Online
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600'>
                    {matchedProfile.location}
                  </span>
                  <br />
                  {matchedProfile.psyApproach.map(approach => {
                    return (
                      <span
                        key={approach.id}
                        className='inline-flex items-center rounded-full bg-indigo-200 px-5 py-1 text-sm font-medium text-indigo-700 mt-6 mr-3'
                      >
                        {approach}
                      </span>
                    );
                  })}
                </div>
                <div className='avatar-icon mb-4 sm:mb-0 sm:mr-4 h-32 w-32 rounded-full'>
                  {matchedProfile.picture ? (
                    HTMLReactParser(matchedProfile.picture)
                  ) : (
                    <img src={placeholder} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-6 xs:grid-cols-1 mt-10'>
            <div className='overflow-hidden rounded-xl shadow h-min'>
              <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                <h3 className='text-white font-bold'>Professional Summary</h3>
              </div>
              <div className='px-4 py-5 sm:p-6 bg-white'>
                <p>{matchedProfile.description}</p>
              </div>
            </div>

            <div>
              <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow mb-6'>
                <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                  <h3 className='text-white font-bold'>Personal Details</h3>
                </div>
                <div className='px-4 py-5 sm:p-6 bg-white'>
                  <span className='font-semibold'>Age</span>
                  <p className='mb-5'>{matchedProfile.age} years old</p>
                  <span className='font-semibold'>Gender</span>
                  <p>{matchedProfile.gender}</p>
                </div>
              </div>

              <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
                <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                  <h3 className='text-white font-bold'>Session Details</h3>
                </div>
                <div className='px-4 py-5 sm:p-6'>
                  <span className='font-semibold'>Price per Session</span>
                  <p className='mb-5'>{matchedProfile.price}€</p>
                  {/* Office Address only if Therapy Setup is In-person */}
                  {matchedProfile.therapySetup.includes('In-person') ? (
                    <div>
                      <span className='font-semibold'>Office Address</span>
                      <p>
                        {matchedProfile.addressStreet}
                        <br />
                        {matchedProfile.addressCode} {matchedProfile.location},
                        Portugal
                      </p>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='absolute top-[50%] right-5'>
            <button onClick={handleBackHome}>
              <img className='w-14' src={homeButton} alt='home icon' />
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <NavbarApp />
      <div className='relative isolate overflow-hidden pt-14 pb-16'>
        <div className='mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8'>
          <div className='mx-auto max-w-6xl lg:mx-0 '>
            {user && matchedProfile && showProfile(user)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMatchedProfile;
