import NavbarApp from '../components/NavbarApp';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profile.context';
import { AuthContext } from '../context/auth.context';
import { getProfile, getUser } from '../api/matches.api.js';

function User() {
  const { profile, setProfile } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);

  console.log('profile:', profile);
  console.log('user:', user);

  const navigate = useNavigate();

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
        if (response) {
          navigate('/questions');
        }
      });
    });
  }, []);

  return (
    <div>
      <NavbarApp />
      {/* if there's no profile yet - redirect to Questions */}

      {/* if there's a profile already - show Matches Status */}

      {/* button for Matches Page */}
      {profile && <Link to='/matchedprofiles'>Matched Profiles</Link>}
    </div>
  );
}

export default User;
