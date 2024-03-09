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
  const [matchedProfile, setMatchedProfile] = useState({});
  const [match, setMatch] = useState({});

  const getUserMatches = async userId => {
    try {
      const response = await getAllUserMatches(userId);
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchById = async id => {
    try {
      const response = await getMatch(id);
      setMatch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneMatchedProfile = async (userId, matchId) => {
    try {
      const response = await getMatchedProfile(userId, matchId);
      setMatchedProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MatchesContext.Provider
      value={{
        matches,
        setMatches,
        match,
        setMatch,
        getUserMatches,
        getMatchById,
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
