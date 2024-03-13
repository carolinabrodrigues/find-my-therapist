import { Link } from 'react-router-dom';
import logo from '../assets/logo black svg.svg';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <div className='flex flex-row justify-between'>
        <Link to='/'>
          <img src={logo} alt='logo image' />
        </Link>
        <div>
          {/* when NOT logged in */}
          {!isLoggedIn && (
            <div>
              <Link to='/login'>Have an account?</Link>
              <Link to='/signup'>
                <button>Register</button>
              </Link>
            </div>
          )}
          {/* when logged in */}
          {isLoggedIn && <Link to='/user'>My Account</Link>}
        </div>
        {/* <Link to='/questions'>Questions</Link>
      <button onClick={logoutUser}>Logout</button>
      <Link to='/matchedprofiles'>Matched Profiles</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
