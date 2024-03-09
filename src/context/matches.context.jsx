/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { getAllUserMatches } from '../api/matches.api';

const MatchesContext = createContext();

const MatchesProviderWrapper = props => {
  const [matches, setMatches] = useState([]);

  const getUserMatches = async userId => {
    try {
      const response = await getAllUserMatches(userId);
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MatchesContext.Provider value={{ matches, setMatches, getUserMatches }}>
      {props.children}
    </MatchesContext.Provider>
  );
};

export { MatchesContext, MatchesProviderWrapper };
