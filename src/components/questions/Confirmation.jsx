import { Link } from 'react-router-dom';

function Confirmation() {
  return (
    <div>
      <h3>Your Profile was created successfully.</h3>
      <Link to='/'>Go to Home</Link>
    </div>
  );
}

export default Confirmation;
