import { MatchesContext } from '../../context/matches.context';
import { AuthContext } from '../../context/auth.context';
import { useContext, useEffect } from 'react';
import { deleteMatch, updateMatch } from '../../api/matches.api';

function ClientProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const { matches, getOneMatchedProfile, matchedProfile } =
    useContext(MatchesContext);

  console.log('user id', user._id);
  console.log('matchId', matchId);

  useEffect(() => {
    if (matchId && user._id) {
      // get data from the match linked to this profile
      // getMatchById(matchId);
      // get the profile from the therapist in this match
      getOneMatchedProfile(user._id, matchId);
    }
  }, [matchId, user._id]);

  console.log('matched profile in client profile:', matchedProfile);

  const handleAccept = async () => {
    const match = matches.find(match => match._id === matchId);
    try {
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
      // TO DO: call getUserMatches to update matches in frontend
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}

export default ClientProfile;
