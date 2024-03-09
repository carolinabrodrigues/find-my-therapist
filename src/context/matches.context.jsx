/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import {
  getAllUserMatches,
  getMatchedProfile,
  getMatch,
} from '../api/matches.api';

const MatchesContext = createContext();

const MatchesProviderWrapper = props => {
  const [matches, setMatches] = useState([]);
  const [matchPage, setMatchPage] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [match, setMatch] = useState({});

  const getOneMatchedProfile = async (userId, matchId) => {
    try {
      const response = await getMatchedProfile(userId, matchId);
      setMatchedProfile(response.data);
      console.log('response', response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('matches inside matches context:', matches);

  console.log('matched profile in matches context:', matchedProfile);
  return (
    <MatchesContext.Provider
      value={{
        matches,
        setMatches,
        match,
        setMatch,
        matchedProfile,
        getOneMatchedProfile,
        matchPage,
        setMatchPage,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export { MatchesContext, MatchesProviderWrapper };
