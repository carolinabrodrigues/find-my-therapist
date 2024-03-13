import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/matches/TherapistProfile';
import ClientProfile from '../components/matches/ClientProfile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';
import { getAllUserMatches } from '../api/matches.api';
// import MatchesPagination from '../components/matches/MatchesPagination';

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

  const showProfiles = () => {
    if (matches.length <= 0) {
      return (
        <p>No profiles match your criteria right now. Check your preferences</p>
      );
    }

    if (user.isTherapist) {
      // if therapist, map over client profile
      return matches.map(match => (
        <ClientProfile key={match._id} matchId={match._id} />
      ));
    } else {
      // if client, map over therapist profile
      return matches.map(match => (
        <TherapistProfile key={match._id} matchId={match._id} />
      ));
    }
  };

  // PAGINATION
  /* const [currentPage, setCurrentPage] = useState(0);
  const pageCount = matches.length;
  const handlePageChange = selectedPage => {
    setCurrentPage(selectedPage);
  }; */

  return (
    <div>
      <NavbarApp />

      {user && matches.length > 0 && showProfiles()}
      {/* {user && matches.length > 0 && (
        <TherapistProfile matchId={matches[0]._id} />
      )} */}
      {/* <MatchesPagination
        pageCount={pageCount}
        handlePageChange={handlePageChange}
      /> */}
    </div>
  );
}

export default MatchedProfiles;
