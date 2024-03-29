/* eslint-disable no-undef */
import NavbarApp from '../components/NavbarApp';
import TherapistProfile from '../components/matches/TherapistProfile';
import ClientProfile from '../components/matches/ClientProfile';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { MatchesContext } from '../context/matches.context';
import { getAllUserMatches } from '../api/matches.api';
import { usePagination, PaginationItemType } from '@nextui-org/react';
import { useNavigate, Link } from 'react-router-dom';
import leftButton from '../assets/left-arrow.svg';
import rightButton from '../assets/right-arrow.svg';
import homeButton from '../assets/back-home-button.svg';
import LoadingSpinner from '../components/LoadingSpinner';

function MatchedProfiles() {
  const { user } = useContext(AuthContext);
  const { matches, setMatches } = useContext(MatchesContext);
  const [showMatches, setShowMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const { activePage, range, setPage } = usePagination({
    total: showMatches.length,
    showControls: true,
    loop: false,
    boundaries: 10,
  });

  const getUserMatches = async userId => {
    try {
      const response = await getAllUserMatches(userId);
      setMatches(response.data);
      const matchesResponse = response.data;

      const filteredMatches = matchesResponse.filter(match => {
        if (user.isTherapist) {
          return match.matchStatus === 'Accepted by Client';
        } else {
          return match.matchStatus === 'Pending';
        }
      });

      setShowMatches(filteredMatches);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUserMatches(user._id);
  }, []);

  const showProfiles = () => {
    if (showMatches.length === 0 && isLoading === false) {
      return (
        <div className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <h1 className='mt-4 text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl'>
              No profiles matching your criteria right now. Check again later
            </h1>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to='/user'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (isLoading === true) {
      return <LoadingSpinner />;
    }
    if (showMatches.length > 0) {
      const matchIndex = activePage - 1; // Adjust match index
      const match = showMatches[matchIndex];
      if (user.isTherapist) {
        return <ClientProfile key={match._id} matchId={match._id} />;
      } else {
        return <TherapistProfile key={match._id} matchId={match._id} />;
      }
    }
  };

  const showPaginationButtons = activePage => {
    const handleBack = () => {
      setPage(activePage - 1);
      setCurrentPage(activePage - 1);
    };

    const handleNext = () => {
      setPage(activePage + 1);
      setCurrentPage(activePage + 1);
    };

    const handleBackHome = () => {
      navigate('/user');
    };

    if (activePage === 1) {
      return (
        <div className='absolute top-[50%] right-5'>
          <button onClick={handleNext}>
            <img className='w-14' src={rightButton} alt='next icon' />
          </button>
        </div>
      );
    } else if (activePage === showMatches.length) {
      return (
        <>
          <div className='absolute top-[50%] left-5'>
            <button onClick={handleBack}>
              <img className='w-14' src={leftButton} alt='back icon' />
            </button>
          </div>
          <div className='absolute top-[50%] right-5'>
            <button onClick={handleBackHome}>
              <img className='w-14' src={homeButton} alt='home icon' />
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='absolute top-[50%] left-5'>
            <button onClick={handleBack}>
              <img className='w-14' src={leftButton} alt='back icon' />
            </button>
          </div>
          <div className='absolute top-[50%] right-5'>
            <button onClick={handleNext}>
              <img className='w-14' src={rightButton} alt='next icon' />
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <NavbarApp />
      <div className='relative isolate overflow-hidden pt-14 pb-16'>
        <div className='mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8'>
          <div className='mx-auto max-w-6xl lg:mx-0 '>
            <div className='flex flex-col gap-2 items-center pb-10'>
              <ul className='flex gap-2 items-center'>
                {range.map(page => {
                  if (page === PaginationItemType.NEXT) {
                    return;
                  }

                  if (page === PaginationItemType.PREV) {
                    return;
                  }

                  return (
                    <li
                      key={page}
                      aria-label={`page ${page}`}
                      className='w-4 h-4'
                    >
                      {activePage === page ? (
                        <button
                          className='w-2.5 h-2.5 bg-zinc-500 rounded-full'
                          onClick={() => {
                            setPage(page);
                            setCurrentPage(page);
                          }}
                        />
                      ) : (
                        <button
                          className='w-2.5 h-2.5 bg-zinc-300 rounded-full'
                          onClick={() => {
                            setPage(page);
                            setCurrentPage(page);
                          }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            {user && showProfiles()}
          </div>
        </div>
      </div>
      {showPaginationButtons(activePage)}
    </div>
  );
}

export default MatchedProfiles;
