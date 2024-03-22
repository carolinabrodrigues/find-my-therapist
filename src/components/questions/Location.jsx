import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { RadioGroup } from '@headlessui/react';

function Location() {
  const [location, setLocation] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const locationOptions = [
    'Aveiro',
    'Beja',
    'Braga',
    'Bragança',
    'Castelo Branco',
    'Coimbra',
    'Évora',
    'Faro',
    'Guarda',
    'Leiria',
    'Lisboa',
    'Portalegre',
    'Porto',
    'Madeira',
    'Açores',
    'Santarém',
    'Viana do Castelo',
    'Vila Real',
    'Viseu',
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleBack = () => {
    setPage(2);
  };

  const handleNext = () => {
    setProfile({ ...profile, location });
    setPage(4);
  };

  return (
    <div className='my-36 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 1: About You
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            What is your location?
          </h3>

          <div className='flex flex-col justify-center'>
            <p className='text-sm text-gray-500 text-center'>
              Select one option only.
            </p>

            <RadioGroup value={location} className='mt-2'>
              <div className='grid grid-cols-4 gap-3 sm:grid-cols-1'>
                {locationOptions.map(option => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    onClick={() => setLocation(option)}
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

export default Location;
