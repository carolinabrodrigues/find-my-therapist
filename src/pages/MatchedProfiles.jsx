import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/TherapistProfile';
import ClientProfile from '../components/ClientProfile';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';

function MatchedProfiles() {
  const { user } = useContext(AuthContext);
  const { matches, getUserMatches, setMatchPage } = useContext(MatchesContext);

  console.log('user', user);

  useEffect(() => {
    getUserMatches(user._id);
  }, [user, getUserMatches]);

  console.log('matches', matches);

  const showProfiles = () => {
    if (!user.isTherapist) {
      if (matches.length <= 0) {
        return <p>No profiles match your criteria right now</p>;
      } else {
        for (let i = 0; i < matches.length; i++) {
          setMatchPage(i + 1);

          return <TherapistProfile matchId={matches[i]._id} />;
        }
      }
    } else {
      // this logic is not complete
      <ClientProfile />;
    }
  };

  return (
    <div>
      <NavbarApp />
      {user && showProfiles(user.isTherapist)}
    </div>
  );
}

export default MatchedProfiles;
