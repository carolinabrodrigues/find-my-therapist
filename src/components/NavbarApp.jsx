import { Link } from 'react-router-dom';
import logo from '../assets/logo black.png';

function NavbarApp() {
  return (
    <nav>
      <Link to='/'>
        <img src={logo} alt='logo image' />
      </Link>

      <div>
        <Link to='/user/:id'>Home</Link>
        <Link to='/profile/:id'>Profile</Link>
        <Link to='/'>Logout</Link>
      </div>
    </nav>
  );
}

export default NavbarApp;
