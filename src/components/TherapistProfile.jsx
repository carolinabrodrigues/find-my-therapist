import { MatchesContext } from '../context/matches.context';
import { AuthContext } from '../context/auth.context';
import { useContext, useEffect } from 'react';
import { updateMatch, deleteMatch } from '../api/matches.api';

function TherapistProfile({ matchId }) {
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

  console.log('matched profile in therapist profile:', matchedProfile);

  const handleLike = async () => {
    try {
      const match = matches.find(match => match._id === matchId);

      if (match) {
        const updatedMatch = { ...match, matchStatus: 'Accepted by Client' };
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {matchedProfile && (
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
              {matchedProfile.addressStreet} {matchedProfile.addressStreet}{' '}
              {matchedProfile.location}, Portugal
            </p>
          </div>
          <div className='ProfileActions'>
            <button>Next</button>
            <button onClick={handleNotInterested}>Not Interested</button>
            <button onClick={handleLike}>Like</button>
          </div>
        </>
      )}
    </>
  );
}

export default TherapistProfile;
