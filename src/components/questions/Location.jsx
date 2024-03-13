import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Location() {
  const [location, setLocation] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, location });
    setPage(4);
  };

  return (
    <div>
      <h2>STEP 1: About You</h2>
      <p>What is your location?</p>
      <select
        id='location'
        name='location'
        value={location}
        onChange={e => setLocation(e.target.value)}
      >
        <option value=''>Select</option>
        <option value='Lisboa'>Lisboa</option>
        <option value='Porto'>Porto</option>
        <option value='Braga'>Braga</option>
        <option value='Faro'>Faro</option>
      </select>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Location;
