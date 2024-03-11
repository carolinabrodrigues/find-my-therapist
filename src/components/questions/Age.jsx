import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Age() {
  const [age, setAge] = useState(0);
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, age });
    setPage(2);
  };

  return (
    <div>
      <h2>STEP 1: About You</h2>
      <p>How old are you?</p>
      <input
        type='number'
        name='age'
        id='age'
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Age;
