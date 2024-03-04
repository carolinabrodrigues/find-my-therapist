import { Link } from 'react-router-dom';
import logo from '../assets/logo black.png';

function Navbar() {
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
    </nav>
  );
}

export default Navbar;
