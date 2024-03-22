import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';

function Price() {
  const [price, setPrice] = useState(0);
  const { profile, handleSubmit, setPage } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleBack = () => {
    if (user.isTherapist) {
      setPage(8);
    } else {
      setPage(9);
    }
  };

  const handleNext = () => {
    // setProfile({ ...profile, user: user._id, price: parseInt(price) });
    const newProfile = { ...profile, user: user._id, price: parseInt(price) };
    console.log('new profile inside handle next', newProfile);
    handleSubmit(newProfile);
    setPage(11);
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 3: Price
          </h2>
          {/* create another question for the therapist */}
          {user.isTherapist ? (
            <h3 className='text-3xl font-bold text-center pb-6'>
              What is your price per session?
            </h3>
          ) : (
            <h3 className='text-3xl font-bold text-center pb-6'>
              What is the most that you are willing to pay per session?
            </h3>
          )}
          <div className='relative mt-2 rounded-md shadow-sm'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <span className='text-gray-500 sm:text-sm'>€</span>
            </div>
            <input
              type='text'
              name='price'
              id='price'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='0.00'
              aria-describedby='price-currency'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className='fixed inset-x-0 bottom-0 bg-white flex h-min p-6 justify-center gap-12'>
            <button
              onClick={handleBack}
              className='rounded-full bg-zinc-200 px-20 py-2.5 text-sm font-semibold shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className='rounded-full bg-indigo-600 px-20 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Next
            </button>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}

export default Price;
