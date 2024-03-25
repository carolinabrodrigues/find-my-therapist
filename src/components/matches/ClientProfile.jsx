import { MatchesContext } from '../../context/matches.context';
import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect, useState } from 'react';
import {
  deleteMatch,
  updateMatch,
  getMatchedProfile,
} from '../../api/matches.api';
import placeholder from '../../assets/picture-placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

function ClientProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const { matches, getUserMatches } = useContext(MatchesContext);

  const [matchedProfile, setMatchedProfile] = useState(null);

  /*   console.log('user id', user._id);
  console.log('matchId', matchId); */

  const navigate = useNavigate();

  const getOneMatchedProfile = async (userId, matchId) => {
    try {
      const response = await getMatchedProfile(userId, matchId);
      setMatchedProfile(response.data);
      console.log('response', response.data);
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

  console.log('matched profile in client profile:', matchedProfile);

  const handleAccept = async () => {
    try {
      const match = matches.find(match => match._id === matchId);
      if (match) {
        const updatedMatch = { ...match, matchStatus: 'Accepted by Therapist' };
        console.log('match updated?', updatedMatch);

        await updateMatch(updatedMatch);
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
                <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
                  <img
                    src={placeholder}
                    className='h-32 w-full border border-gray-300 bg-white text-gray-300 sm:w-32 rounded-full'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-6 xs:grid-cols-1 mt-10'>
            <div className='overflow-hidden rounded-xl shadow h-min'>
              <div className='px-4 py-3 sm:px-4 bg-indigo-950'>
                <h3 className='text-white font-bold'>Preferences</h3>
              </div>

              <div className='px-4 py-5 sm:p-6'>
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
          </div>
        </>
      )}
    </>
  );
}

export default ClientProfile;
