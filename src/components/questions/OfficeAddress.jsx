import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function OfficeAddress() {
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleBack = () => {
    setPage(5);
  };

  const handleNext = () => {
    setProfile({ ...profile, addressStreet, addressCode });
    setPage(7);
  };

  return (
    <div className='my-36 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 1: About You
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            What is your office address?
          </h3>
          <div className='flex flex-col justify-center'>
            <div>
              <label
                htmlFor='addressStreet'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Address
              </label>
              <div className='mt-2'>
                <input
                  id='addressStreet'
                  name='addressStreet'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={addressStreet}
                  onChange={e => setAddressStreet(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-5'>
              <label
                htmlFor='addressCode'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Postal Code
              </label>
              <div className='mt-2'>
                <input
                  id='addressCode'
                  name='addressCode'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={addressCode}
                  onChange={e => setAddressCode(e.target.value)}
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
      </div>
    </div>
  );
}

export default OfficeAddress;
