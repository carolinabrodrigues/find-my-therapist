import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/TherapistProfile';
import ClientProfile from '../components/ClientProfile';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';

function MatchedProfiles() {
  const { user } = useContext(AuthContext);
  const { matches, getUserMatches } = useContext(MatchesContext);
  console.log('user', user);

  useEffect(() => {
    getUserMatches(user._id);
  }, [user, getUserMatches]);

  console.log('matches', matches);

  /* const showProfiles = () => {

    for (let i = 0; i < matches.length; i++) {
      const element = matches[i];
      
    }

  }
 */
  return (
    <div>
      <NavbarApp />
      {user && user.isTherapist ? <ClientProfile /> : <TherapistProfile />}
    </div>
  );
}

export default MatchedProfiles;
