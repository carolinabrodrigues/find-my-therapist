import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/matches/TherapistProfile';
import ClientProfile from '../components/matches/ClientProfile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';
// import MatchesPagination from '../components/matches/MatchesPagination';
/* import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from '@nextui-org/pagination'; */
import {
  Pagination,
  Button,
  usePagination,
  PaginationItemType,
} from '@nextui-org/react';
import { ChevronIcon } from '../components/ChevronIcon';

function MatchedProfiles() {
  const { user } = useContext(AuthContext);
  const { matches, setMatches, getUserMatches } = useContext(MatchesContext);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    // mudar total para matches length
    total: matches.length,
    showControls: true,
    loop: true,
    boundaries: 10,
  });

  useEffect(() => {
    getUserMatches(user._id);
  }, []);

  const showMatchedProfiles = () => {
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
      {user && matches.length > 0 && showMatchedProfiles()}
      {/* {user && matches.length > 0 && (
        <TherapistProfile matchId={matches[0]._id} />
      )} */}
      {/* <MatchesPagination
        pageCount={pageCount}
        handlePageChange={handlePageChange}
      /> */}
      {/*  <Pagination
        showShadow
        loop
        total={10}
        page={currentPage}
        onChange={setCurrentPage}
      />
      <Button
        size='sm'
        variant='flat'
        onPress={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}
      >
        Previous
      </Button>
      <Button
        size='sm'
        variant='flat'
        color='secondary'
        onPress={() => setCurrentPage(prev => (prev < 10 ? prev + 1 : prev))}
      >
        Next
      </Button> */}

      <div className='flex flex-col gap-2'>
        <p>Active page: {activePage}</p>
        <ul className='flex gap-2 items-center'>
          {range.map(page => {
            if (page === PaginationItemType.NEXT) {
              return (
                <li key={page} aria-label='next page' className='w-4 h-4'>
                  <button
                    className='w-full h-full bg-default-200 rounded-full'
                    onClick={onNext}
                  >
                    <ChevronIcon className='rotate-180' />
                  </button>
                </li>
              );
            }

            if (page === PaginationItemType.PREV) {
              return (
                <li key={page} aria-label='previous page' className='w-4 h-4'>
                  <button
                    className='w-full h-full bg-default-200 rounded-full'
                    onClick={onPrevious}
                  >
                    <ChevronIcon />
                  </button>
                </li>
              );
            }

            {
              /*             if (page === PaginationItemType.DOTS) {
              return (
                <li key={page} className='w-4 h-4'>
                  ...
                </li>
              );
            } */
            }

            return (
              <li
                key={page}
                aria-label={`page ${page}`}
                className='w-4 h-4 p-8'
              >
                <button
                  className={`
                    w-3 h-3 bg-sky-400 rounded-full,
                    ${activePage === page && 'bg-secondary'}`}
                  onClick={() => {
                    setPage(page);
                    setMatches(matches[page - 1]);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MatchedProfiles;
