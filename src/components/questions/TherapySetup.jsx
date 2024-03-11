import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';

function TherapySetup() {
  const [therapySetup, setTherapySetup] = useState([]);
  const [checkedOnline, setCheckedOnline] = useState(false);
  const [checkedInPerson, setCheckedInPerson] = useState(false);
  const { profile, setProfile, setPage } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleOnline = () => {
    setCheckedOnline(!checkedOnline);
    if (!checkedOnline) {
      setTherapySetup(prevSetup => [...prevSetup, 'Online']);
    } else {
      setTherapySetup(prevSetup =>
        prevSetup.filter(setup => setup !== 'Online')
      );
    }
  };

  const handleInPerson = () => {
    setCheckedInPerson(!checkedInPerson);
    if (!checkedInPerson) {
      setTherapySetup(prevSetup => [...prevSetup, 'In-person']);
    } else {
      setTherapySetup(prevSetup =>
        prevSetup.filter(setup => setup !== 'In-person')
      );
    }
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
    <div>
      <h2>STEP 1: About You</h2>
      <p>What is your preference in the therapy setup?</p>

      <input
        type='checkbox'
        id='online'
        name='online'
        checked={checkedOnline}
        onChange={handleOnline}
      />
      <label htmlFor='online'>Online</label>
      <input
        type='checkbox'
        id='in-person'
        name='in-person'
        checked={checkedInPerson}
        onChange={handleInPerson}
      />
      <label htmlFor='in-person'>In-person</label>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default TherapySetup;
