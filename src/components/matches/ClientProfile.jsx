import { MatchesContext } from '../../context/matches.context';
import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect, useState } from 'react';
import {
  deleteMatch,
  updateMatch,
  getMatchedProfile,
} from '../../api/matches.api';

function ClientProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const { matches } = useContext(MatchesContext);

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
      console.log('match deleted?');

      // TO DO: call getUserMatches to update matches in frontend
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
          </div>
          <div className='ProfileDetails'>
            <h3>Preferences</h3>
            <p>Price per Session</p>
            <p>Up to {matchedProfile.price}€</p>

            <p>Psychological Approach</p>
            {matchedProfile.psyApproach.map(approach => {
              return <p key={approach.id}>{approach}</p>;
            })}

            <h3>Personal Details</h3>
            <p>Age</p>
            <p>{matchedProfile.age} years old</p>
            <p>Gender</p>
            <p>{matchedProfile.gender}</p>
          </div>
          <div className='ProfileActions'>
            <button onClick={handleDismiss}>Dismiss</button>
            <button onClick={handleAccept}>Accept</button>
          </div>
        </>
      )}
    </>
  );
}

export default ClientProfile;
