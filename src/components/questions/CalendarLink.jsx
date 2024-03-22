import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function CalendarLink() {
  const [calendarLink, setCalendarLink] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleBack = () => {
    setPage(7);
  };

  const handleNext = () => {
    setProfile({ ...profile, calendarLink });
    setPage(10);
  };

  return (
    <div className='my-56 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl flex justify-center'>
        <div>
          <h2 className='text-base font-semibold py-6 text-center'>
            STEP 2: Expertise & Approach
          </h2>
          <h3 className='text-3xl font-bold text-center pb-6'>
            What is your calendar link?
          </h3>
          <div className='mt-2'>
            <input
              type='text'
              name='calendarLink'
              id='calendarLink'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='https://calendly.com/your-calendar'
              onChange={e => setCalendarLink(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarLink;
