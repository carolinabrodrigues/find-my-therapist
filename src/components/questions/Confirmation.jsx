import { Link } from 'react-router-dom';

function Confirmation() {
  return (
    <div>
      <h3>Your Profile was created successfully.</h3>
      {/* what shows if there's an error? */}
      <Link to='/user'>Go to Home</Link>
    </div>
  );
}

export default Confirmation;
