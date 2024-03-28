import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect } from 'react';
import { getProfile, getUser } from '../../api/matches.api';
import HTMLReactParser from 'html-react-parser';
import placeholder from '../assets/placeholderAvatar.svg';
import { ProfileContext } from '../../context/profile.context';
import NavbarApp from '../NavbarApp';
import { useNavigate, Link } from 'react-router-dom';
import edit from '../assets/edit-icon.svg';

function MyProfile() {
  const { user, setUser } = useContext(AuthContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const navigate = useNavigate();

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
        /* if there's no profile yet - redirect to Questions */
        if (!response) {
          navigate('/questions');
        }
      });
    });
  }, []);

  console.log(profile);
  console.log(user);

  const showProfileDetails = user => {
    if (user.isTherapist) {
      return (
        <div className='grid grid-cols-2 gap-x-6 xs:grid-cols-1 mt-10'>
          <div className='overflow-hidden rounded-xl shadow h-min'>
            <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
              <h3 className='text-white font-bold'>Professional Summary</h3>
            </div>
            <div className='px-4 py-5 sm:p-6 bg-white'>
              <p>{profile.description}</p>
            </div>
          </div>

          <div>
            <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow mb-6'>
              <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                <h3 className='text-white font-bold'>Personal Details</h3>
              </div>
              <div className='px-4 py-5 sm:p-6'>
                <span className='font-semibold'>Age</span>
                <p className='mb-5'>{profile.age} years old</p>
                <span className='font-semibold'>Gender</span>
                <p>{profile.gender}</p>
              </div>
            </div>

            <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
              <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                <h3 className='text-white font-bold'>Session Details</h3>
              </div>
              <div className='px-4 py-5 sm:p-6'>
                <span className='font-semibold'>Price per Session</span>
                <p className='mb-5'>{profile.price}€</p>
                {/* Office Address only if Therapy Setup === In-person */}
                {profile.therapySetup.includes('In-person') ? (
                  <div>
                    <span className='font-semibold'>Office Address</span>
                    <p>
                      {profile.addressStreet}
                      <br />
                      {profile.addressCode} {profile.location}, Portugal
                    </p>
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='grid grid-cols-2 gap-x-6 xs:grid-cols-1 mt-10'>
          <div className='overflow-hidden rounded-xl shadow h-min'>
            <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
              <h3 className='text-white font-bold'>Preferences</h3>
            </div>

            <div className='px-4 py-5 sm:p-6'>
              <span className='font-semibold'>Price per Session</span>
              <p className='mb-5'>Up to {profile.price}€</p>
              <span className='font-semibold'>Psychological Approach</span>
              {profile.psyApproach.map(approach => {
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
                <p className='mb-5'>{profile.age} years old</p>
                <span className='font-semibold'>Gender</span>
                <p>{profile.gender}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <NavbarApp />
      <div className='relative isolate overflow-hidden pt-14 pb-16'>
        <div className='mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8'>
          <div className='mx-auto max-w-6xl lg:mx-0 '>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to='/'
                className='rounded-md bg-indigo-600 px-5 py-2.5 mb-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                style={{ display: 'inline-flex', alignItems: 'center' }} // Add inline-flex display
              >
                <img
                  src={edit}
                  alt='Edit Icon'
                  style={{ marginRight: '0.5rem' }}
                />{' '}
                {/* Add alt text for accessibility and margin */}
                <span>Edit profile preferences</span>
              </Link>
            </div>

            {user && profile && (
              <>
                <div className='overflow-hidden rounded-lg bg-indigo-100 shadow'>
                  <div className='px-8 py-10 sm:px-8 sm:py-10'>
                    <div className='flex flex-row justify-between'>
                      <div>
                        <h2 className='text-indigo-800 font-bold text-xl mb-6'>
                          {user.firstName} {user.lastName}
                        </h2>

                        {profile.therapySetup.includes('Online') ? (
                          <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600 mr-3'>
                            Online
                          </span>
                        ) : (
                          <span></span>
                        )}
                        <span className='inline-flex items-center rounded-full bg-zinc-100 px-5 py-1 text-sm font-medium text-zinc-600'>
                          {profile.location}
                        </span>
                        <br />
                        {profile.psyApproach.map(approach => {
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
                        {profile.picture ? (
                          HTMLReactParser(profile.picture)
                        ) : (
                          <img src={placeholder} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {showProfileDetails(user.isTherapist)}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
