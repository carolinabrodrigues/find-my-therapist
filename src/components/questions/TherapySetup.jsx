import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';
import { CheckboxGroup } from '@nextui-org/react';
import { CustomCheckbox } from './CustomCheckbox';

function TherapySetup() {
  const [therapySetup, setTherapySetup] = useState([]);
  const { profile, setProfile, setPage } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleBack = () => {
    setPage(3);
  };

  const handleNext = () => {
    setProfile({ ...profile, therapySetup });

    if (user.isTherapist) {
      // if user is therapist & picked in-person - go to page 5
      if (therapySetup.includes('In-person')) {
        setPage(5);
      } else {
        setPage(6);
      }
    } else {
      // if user is client - go to page 7
      setPage(6);
    }
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 1: About You
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            What is your preference in the therapy setup?
          </h3>

          <div className='flex flex-col justify-center'>
            <p className='text-sm text-gray-500 text-center pb-2'>
              Select one or more options.
            </p>
            <CheckboxGroup
              className='flex justify-center items-center'
              orientation='vertical'
              value={therapySetup}
              onChange={setTherapySetup}
            >
              <CustomCheckbox padding='6' value='In-person'>
                <div className='w-96 font-semibold'>IN-PERSON</div>
              </CustomCheckbox>
              <CustomCheckbox padding='6' value='Online'>
                <div className='w-96 font-semibold'>ONLINE</div>
              </CustomCheckbox>
            </CheckboxGroup>
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

export default TherapySetup;
