import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';
import { CheckboxGroup } from '@nextui-org/react';
import { CustomCheckbox } from './CustomCheckbox';

function PsyApproach() {
  const [psyApproach, setPsyApproach] = useState([]);
  const { profile, setProfile, setPage } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleBack = () => {
    if (user.isTherapist) {
      if (profile.therapySetup.includes('In-person')) {
        setPage(6);
      } else {
        setPage(5);
      }
    } else {
      setPage(5);
    }
  };

  const handleNext = () => {
    setProfile({ ...profile, psyApproach });

    // if user is therapist - go to page Description
    if (user.isTherapist) {
      setPage(8);
    } else {
      // if user is client - go to page PriceImportant
      setPage(10);
    }
  };

  return (
    <div className='my-36 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 2: Expertise & Approach
          </h2>
          {user.isTherapist ? (
            <h3 className='text-3xl font-bold text-center pb-6'>
              What is the main psychological approach you follow in your
              sessions?
            </h3>
          ) : (
            <h3 className='text-3xl font-bold text-center pb-6'>
              Which of these psychological approaches resonates better with you?
            </h3>
          )}

          <div className='flex flex-col justify-center'>
            <p className='text-sm text-gray-500 text-center pb-2'>
              Select one or more options.
            </p>
            <div>
              <CheckboxGroup
                className='flex justify-center items-center'
                orientation='vertical'
                value={psyApproach}
                onChange={setPsyApproach}
              >
                <CustomCheckbox padding='12' value='Cognitive Behavioral'>
                  <div className='text-left w-full'>
                    <div className='font-semibold pb-1.5'>
                      COGNITIVE BEHAVIORAL
                    </div>
                    <p>
                      Helps you change how you think and act to feel better.
                    </p>
                  </div>
                </CustomCheckbox>
                <CustomCheckbox
                  padding='12'
                  className='w-full'
                  value='Psychoanalytical'
                >
                  <div className='text-left w-full'>
                    <div className='font-semibold pb-1.5'>PSYCHOANALYTICAL</div>
                    <p>
                      Looks at your past and hidden thoughts to figure out why
                      you feel the way you do.
                    </p>
                  </div>
                </CustomCheckbox>
                <CustomCheckbox padding='12' value='Humanistic'>
                  <div className='text-left w-full'>
                    <div className='font-semibold pb-1.5'>HUMANISTIC</div>
                    <p>
                      Encourages you to become your best self and focus on what
                      makes you happy.
                    </p>
                  </div>
                </CustomCheckbox>
                <CustomCheckbox padding='12' value='Systematic'>
                  <div className='text-left w-full'>
                    <div className='font-semibold pb-1.5'>SYSTEMATIC</div>
                    <p>
                      Studies how your surroundings affect how you behave and
                      feel.
                    </p>
                  </div>
                </CustomCheckbox>
                <CustomCheckbox padding='12' value='Constructionist'>
                  <div className='text-left w-full'>
                    <div className='font-semibold pb-1.5'>CONSTRUCTIONIST</div>
                    <p>
                      Explores how you create meaning from what you say and how
                      you interact with others.
                    </p>
                  </div>
                </CustomCheckbox>
              </CheckboxGroup>
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

export default PsyApproach;
