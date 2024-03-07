import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function CalendarLink() {
  const [calendarLink, setCalendarLink] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, calendarLink });

    setPage(7);
    console.log('profile inside handle next', profile);
  };

  return (
    <div>
      <h2>STEP 1: About You</h2>
      <p>What is your calendar link?</p>

      <input
        type='text'
        name='calendarLink'
        id='calendarLink'
        value={calendarLink}
        onChange={e => setCalendarLink(e.target.value)}
      />

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default CalendarLink;
