/* eslint-disable react/prop-types */
import { MatchesContext } from '../../context/matches.context';
import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect, useState } from 'react';
import {
  updateMatch,
  deleteMatch,
  getMatchedProfile,
} from '../../api/matches.api';

function TherapistProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const { matches } = useContext(MatchesContext);

  // setCurrentPage(key + 1);

  const [matchedProfile, setMatchedProfile] = useState(null);

  console.log('user id', user._id);
  console.log('matchId', matchId);

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
      // get the profile from the therapist in this match
      getOneMatchedProfile(user._id, matchId);
    }
  }, []);

  const handleLike = async () => {
    try {
      const match = matches.find(match => match._id === matchId);

      if (match) {
        const updatedMatch = {
          ...match,
          matchStatus: 'Accepted by Client',
        };
        console.log('match updated?', updatedMatch);

        await updateMatch(updatedMatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotInterested = async () => {
    try {
      await deleteMatch(matchId);
      console.log('match deleted?');
      // TO DO: call getUserMatches to update matches in frontend
      // navigate to next match OR user page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && matchedProfile && (
        <>
          <div className='ProfileHeader'>
            <h2>
              {matchedProfile.user.firstName} {matchedProfile.user.lastName}
            </h2>
            {matchedProfile.therapySetup.includes('Online') ? (
              <p>Online</p>
            ) : (
              <p></p>
            )}
            <p>{matchedProfile.location}</p>
            {matchedProfile.psyApproach.map(approach => {
              return <p key={approach.id}>{approach}</p>;
            })}
          </div>
          <div className='ProfileDetails'>
            <h3>Professional Summary</h3>
            <p>{matchedProfile.description}</p>
            <h3>Personal Details</h3>
            <p>Age</p>
            <p>{matchedProfile.age} years old</p>
            <p>Gender</p>
            <p>{matchedProfile.gender}</p>
            <h3>Session Details</h3>
            <p>Price per Session</p>
            <p>{matchedProfile.price}€</p>
            <p>Office Address</p>
            <p>
              {matchedProfile.addressStreet} {matchedProfile.addressCode}{' '}
              {matchedProfile.location}, Portugal
            </p>
          </div>
          <div className='fixed inset-x-0 bottom-0 bg-white flex h-min p-6 justify-center gap-12'>
            <button
              onClick={handleNotInterested}
              className='rounded-full bg-zinc-200 px-10 py-2.5 text-sm font-semibold shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Not Interested
            </button>
            <button
              onClick={handleLike}
              className='rounded-full bg-indigo-600 px-20 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Like
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default TherapistProfile;
