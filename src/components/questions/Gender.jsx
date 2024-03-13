import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Gender() {
  const [gender, setGender] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, gender });
    setPage(3);
  };

  return (
    <div>
      <h2>STEP 1: About You</h2>
      <p>What is your gender?</p>
      <input
        type='text'
        name='gender'
        id='gender'
        value={gender}
        onChange={e => setGender(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Gender;
