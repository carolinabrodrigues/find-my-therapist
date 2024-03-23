import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../context/profile.context';
import { useContext } from 'react';

function Confirmation() {
  const { submittedProfile, setPage } = useContext(ProfileContext);

  const navigate = useNavigate();

  const handleGoHome = () => {
    setPage(1);
    navigate('/user');
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-3xl font-bold text-center pb-6'>
            {submittedProfile?.message
              ? submittedProfile.message
              : 'Your Profile was created successfully.'}
          </h3>
          {/* what shows if there's an error? */}

          <button
            onClick={handleGoHome}
            className='rounded-full bg-indigo-600 px-32 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
