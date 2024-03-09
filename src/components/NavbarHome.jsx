import { Link } from 'react-router-dom';
import logo from '../assets/logo black.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to='/'>
        <img src={logo} alt='logo image' />
      </Link>
      {/* when NOT logged in */}
      <div>
        <Link to='/login'>Have an account?</Link>
        <Link to='/signup'>
          <button>Register</button>
        </Link>
      </div>
      {/* when logged in */}
      <Link to='/user'>
        <button>My Account</button>
      </Link>
      <Link to='/questions'>Questions</Link>
      <button onClick={logoutUser}>Logout</button>
      <Link to='/matchedprofiles'>Matched Profiles</Link>
    </nav>
  );
}

export default Navbar;
