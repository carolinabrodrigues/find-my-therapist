import NavbarApp from '../components/NavbarApp';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/profile.context';
import { AuthContext } from '../context/auth.context';
import {
  getProfile,
  getUser,
  getMatchedProfile,
  addMatches,
} from '../api/matches.api.js';
import { MatchesContext } from '../context/matches.context.jsx';

function User() {
  const { profile, setProfile } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { matches, getUserMatches } = useContext(MatchesContext);

  console.log('profile:', profile);
  console.log('user:', user);
  console.log('matches:', matches);

  const navigate = useNavigate();

  const [pendingProfiles, setPendingProfiles] = useState(null);
  const [acceptedProfiles, setAcceptedProfiles] = useState(null);

  console.log('pending profiles:', pendingProfiles);
  console.log('accepted profiles:', acceptedProfiles);

  // GET Profile by User.Profile
  // to make sure we always have the most updated info
  const getUserInfo = async id => {
    try {
      const response = await getUser(id);
      setUser(response.data);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfile = async id => {
    try {
      const response = await getProfile(id);
      setProfile(response.data);
      const profileData = response.data;
      return profileData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(user._id).then(response => {
      getUserProfile(response.profile).then(response => {
        /* if there's no profile yet - redirect to Questions */
        if (!response) {
          navigate('/questions');
        }
      });
    });
  }, []);

  // GET Matches by User
  useEffect(() => {
    getUserMatches(user._id);
  }, []);

  // THERAPIST: for each match accepted by therapist, I want to show the matched profile info
  // CLIENT: for each match accepted by client or therapist, I want to show the matched profile
  const getPendingProfiles = async () => {
    try {
      const pendingMatches = matches.filter(
        match => match.matchStatus === 'Accepted by Client'
      );

      let updatedPendingProfiles = [];

      for (let i = 0; i < pendingMatches.length; i++) {
        const response = await getMatchedProfile(
          user._id,
          pendingMatches[i]._id
        );
        updatedPendingProfiles.push(response.data);
        setPendingProfiles(updatedPendingProfiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAcceptedProfiles = async () => {
    try {
      const acceptedMatches = matches.filter(
        match => match.matchStatus === 'Accepted by Therapist'
      );

      let updatedAcceptedProfiles = [];

      for (let i = 0; i < acceptedMatches.length; i++) {
        const response = await getMatchedProfile(
          user._id,
          acceptedMatches[i]._id
        );
        updatedAcceptedProfiles.push(response.data);
        setAcceptedProfiles(updatedAcceptedProfiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.isTherapist) {
      getAcceptedProfiles();
    } else {
      getPendingProfiles();
      getAcceptedProfiles();
    }
  }, [matches]);

  console.log('user id:', user._id);

  const handleMatchesButton = async () => {
    try {
      await addMatches(user._id);
      navigate('/matchedprofiles');
    } catch (error) {
      console.log(error);
    }
  };

  const showMatchesCards = user => {
    const showPendingMatches = matches.filter(
      match => match.matchStatus === 'Accepted by Client'
    );

    if (user.isTherapist) {
      // IF THERAPIST
      return (
        <>
          <h2>Pending Matches</h2>
          <p>
            You have {showPendingMatches.length} matches waiting for your review
          </p>
          {showPendingMatches.length > 0 && (
            <button>
              <Link to='/matchedprofiles'>Review pending matches</Link>
            </button>
          )}

          {acceptedProfiles && (
            <>
              <h2>Accepted Matches</h2>
              {acceptedProfiles.map(profile => {
                return (
                  <div key={profile._id}>
                    <h3>
                      {profile.user.firstName} {profile.user.lastName}
                    </h3>
                    <p>{profile.location}</p>
                    <button>View</button>
                  </div>
                );
              })}
            </>
          )}

          <p>Not enough matches?</p>
          <button>
            <Link to='/questions'>Edit your preferences</Link>
          </button>
        </>
      );
    } else {
      // IF CLIENT
      return (
        <>
          <h2>Your Matches</h2>
          {matches.length > 0 && (
            <>
              {pendingProfiles && (
                <>
                  <h3>Waiting for response</h3>
                  {pendingProfiles.map(profile => {
                    return (
                      <div key={profile._id}>
                        <h3>
                          {profile.user.firstName} {profile.user.lastName}
                        </h3>
                        <p>{profile.location}</p>
                        <button>View</button>
                      </div>
                    );
                  })}
                </>
              )}
              {acceptedProfiles && (
                <>
                  <h3>Accepted matches</h3>
                  {acceptedProfiles.map(profile => {
                    return (
                      <div key={profile._id}>
                        <h3>
                          {profile.user.firstName} {profile.user.lastName}
                        </h3>
                        <p>{profile.location}</p>
                        <button>View</button>
                        {/* Book button links to calendar link of therapist */}
                        <button>Book</button>
                      </div>
                    );
                  })}
                </>
              )}

              {pendingProfiles && acceptedProfiles ? (
                <p>Looking for new suggestions?</p>
              ) : (
                <p>You have matches to review</p>
              )}
              <Link to='/matchedprofiles'>Check new matches</Link>
            </>
          )}

          {matches.length === 0 && (
            <>
              <p>No matches yet</p>
              <button onClick={handleMatchesButton}>Get matches</button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <NavbarApp />
      <h1>
        Welcome back, {user.firstName} {user.lastName}
      </h1>
      {profile && matches && showMatchesCards(user)}
      <br />
      <br />
      <Link to='/matchedprofiles'>Matched Profiles</Link>
    </div>
  );
}

export default User;
