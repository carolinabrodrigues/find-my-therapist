import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';
import { RadioGroup } from '@headlessui/react';

function PriceImportant() {
  const [priceImportant, setPriceImportant] = useState('');
  const { user } = useContext(AuthContext);
  const { profile, setPage, handleSubmit } = useContext(ProfileContext);

  const priceOptions = ['yes', 'no'];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleBack = () => {
    setPage(6);
  };

  const handleNext = () => {
    if (priceImportant === 'no') {
      // setProfile({ ...profile, price: 0, user: user._id }); // Set price to 0 if not important
      const newProfile = { ...profile, user: user._id, price: 0 };
      console.log('new profile inside handle next', newProfile);
      handleSubmit(newProfile);
      setPage(11);
    } else {
      setPage(10); // Proceed to next question if price is important
    }
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 3: Price
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            Is the price important for you?
          </h3>

          <div className='flex flex-col justify-center'>
            <RadioGroup value={priceImportant} className='mt-2'>
              <div className='grid grid-cols-4 gap-3 sm:grid-cols-1'>
                {priceOptions.map(option => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    onClick={() => setPriceImportant(option)}
                    className={({ active, checked }) =>
                      classNames(
                        option
                          ? 'cursor-pointer focus:outline-none'
                          : 'cursor-not-allowed opacity-25',
                        active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                        checked
                          ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                          : ' bg-white text-gray-900 hover:bg-gray-50',
                        'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as='span'>{option}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
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

export default PriceImportant;
