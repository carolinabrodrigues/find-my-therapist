import { Link } from 'react-router-dom';
import logo from '../assets/logo black svg.svg';
import home from '../assets/home.svg';
import profile from '../assets/profile.svg';
import logout from '../assets/logout.svg';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function NavbarApp() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <nav className='flex flex-row'>
      <Link to='/'>
        <img src={logo} alt='logo image' />
      </Link>

      <div>
        <Link to='/user'>
          <div className='flex flex-col justify-center'>
            <img src={home} alt='home icon' />
            <p>Home</p>
          </div>
        </Link>
        <Link to='/profile'>
          <div>
            <img src={profile} alt='profile icon' />
            <p>Profile</p>
          </div>
        </Link>
        <Link onClick={logoutUser}>
          <div>
            <img src={logout} alt='logout icon' />
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarApp;
