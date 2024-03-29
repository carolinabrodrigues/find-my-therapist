/* eslint-disable react/prop-types */
import { MatchesContext } from '../../context/matches.context';
import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect, useState, Fragment } from 'react';
import {
  deleteMatch,
  updateMatch,
  getMatchedProfile,
} from '../../api/matches.api';
import { useNavigate } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import placeholder from '../../assets/placeholderAvatar.svg';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

function ClientProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const { matches, getUserMatches } = useContext(MatchesContext);

  const [matchedProfile, setMatchedProfile] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const getOneMatchedProfile = async (userId, matchId) => {
    try {
      const response = await getMatchedProfile(userId, matchId);
      setMatchedProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (matchId && user._id) {
      // get data from the client in this match
      getOneMatchedProfile(user._id, matchId);
    }
  }, []);

  const handleAccept = async () => {
    try {
      const match = matches.find(match => match._id === matchId);
      if (match) {
        const updatedMatch = { ...match, matchStatus: 'Accepted by Therapist' };

        await updateMatch(updatedMatch);

        setShow(true);

        const timeoutId = setTimeout(() => {
          setShow(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDismiss = async () => {
    try {
      await deleteMatch(matchId);
      getUserMatches(user._id);
      navigate('/matchedprofiles');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && matchedProfile && (
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
                {matchedProfile.price === 0 ? (
                  <p className='mb-5'>Any price</p>
                ) : (
                  <p className='mb-5'>Up to {matchedProfile.price}€</p>
                )}
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
          <div className='fixed inset-x-0 bottom-0 bg-white flex h-min p-4 justify-center gap-12'>
            <button
              onClick={handleDismiss}
              className='rounded-full bg-zinc-200 px-10 py-2.5 text-sm font-semibold shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Dismiss
            </button>
            <button
              onClick={handleAccept}
              className='rounded-full bg-indigo-600 px-20 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Accept
            </button>
          </div>

          {/* Notifications */}
          <div
            aria-live='assertive'
            className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6'
          >
            <div className='flex w-full flex-col items-center space-y-4 sm:items-end mt-16'>
              <Transition
                show={show}
                as={Fragment}
                enter='transform ease-out duration-300 transition'
                enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                enterTo='translate-y-0 opacity-100 sm:translate-x-0'
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                  <div className='p-4'>
                    <div className='flex items-start'>
                      <div className='flex-shrink-0'>
                        <CheckCircleIcon
                          className='h-6 w-6 text-green-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='ml-3 w-0 flex-1 pt-0.5'>
                        <p className='text-sm font-medium text-gray-900'>
                          Successfully accepted!
                        </p>
                        <p className='mt-1 text-sm text-gray-500'>
                          We’ll share your calendar link with{' '}
                          {matchedProfile.user.firstName} so you can schedule
                          your first session.
                        </p>
                      </div>
                      <div className='ml-4 flex flex-shrink-0'>
                        <button
                          type='button'
                          className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          <span className='sr-only'>Close</span>
                          <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ClientProfile;
