import { MatchesContext } from '../context/matches.context';
import { AuthContext } from '../context/auth.context';
import { useContext, useEffect } from 'react';
import { updateMatch } from '../api/matches.api';

function TherapistProfile({ matchId }) {
  const { user } = useContext(AuthContext);
  const {
    matches,
    getOneMatchedProfile,
    matchedProfile,
    getMatchById,
    match,
    setMatch,
  } = useContext(MatchesContext);

  useEffect(() => {
    // get data from the match linked to this profile
    getMatchById(matchId);
    // get the profile from the therapist in this match
    getOneMatchedProfile(user._id, matchId);
  }, [matches]);

  console.log('matched profile:', matchedProfile);

  const handleLike = async () => {
    try {
      match['matchStatus'] = 'Accepted by Client';
      console.log('match updated?', match);

      updateMatch(match);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotInterested = async () => {};

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
        <button>Not Interested</button>
        <button onClick={handleLike}>Like</button>
      </div>
    </>
  );
}

export default TherapistProfile;
