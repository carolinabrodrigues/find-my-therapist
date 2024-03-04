import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <Link to='/'>Register</Link> - <Link to='/'>Useful Resources</Link> -{' '}
      <Link to='/'>Contact</Link>
      <p>
        © 2024 <a href='https://github.com/carolinabrods'>Carolina Rodrigues</a>
      </p>
    </div>
  );
}

export default Footer;
