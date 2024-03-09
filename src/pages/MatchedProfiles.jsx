import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/TherapistProfile';
import ClientProfile from '../components/ClientProfile';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';
import { getAllUserMatches } from '../api/matches.api';

function MatchedProfiles() {
  const { user } = useContext(AuthContext);
  const { matches, setMatches } = useContext(MatchesContext);

  const getUserMatches = async userId => {
    try {
      const response = await getAllUserMatches(userId);
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserMatches(user._id);
  }, []);

  /* const showProfiles = () => {
    if (!user.isTherapist) {
      if (matches.length <= 0) {
        return <p>No profiles match your criteria right now</p>;
      } else {
        return matches.map(match => (
          <TherapistProfile key={match._id} matchId={match._id} />
        ));
      }
    }
  }; */

  //   console.log('match 1', matches[0]);

  return (
    <div>
      <h3>Here</h3>
      <NavbarApp />
      {/*       {user && showProfiles()}
       */}
      {user && matches.length > 0 && (
        <TherapistProfile matchId={matches[0]._id} />
      )}
    </div>
  );
}

export default MatchedProfiles;
