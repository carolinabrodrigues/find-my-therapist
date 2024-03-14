/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const MatchesContext = createContext();

const MatchesProviderWrapper = props => {
  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState([]);
  const [matchPage, setMatchPage] = useState(0);

  return (
    <MatchesContext.Provider
      value={{
        matches,
        setMatches,
        showMatches,
        setShowMatches,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};

export { MatchesContext, MatchesProviderWrapper };
