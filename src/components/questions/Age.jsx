import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Age() {
  const [age, setAge] = useState(0);
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleBack = () => {
    setPage(1);
  };

  const handleNext = () => {
    setProfile({ ...profile, age });
    setPage(3);
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 1: About You
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            How old are you?
          </h3>
          <div className='flex justify-center'>
            <input
              className='rounded bg-white mt-5 w-full border-1 border-gray-300'
              type='number'
              name='age'
              id='age'
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default Age;
