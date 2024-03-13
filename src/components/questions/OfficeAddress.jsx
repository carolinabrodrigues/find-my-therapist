import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function OfficeAddress() {
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, addressStreet, addressCode });

    // if user picked Online - go to page 6
    if (profile.therapySetup.find(setup => setup === 'Online')) {
      setPage(6);
    }

    // if user did not pick Online - go to page 7
    if (!profile.therapySetup.find(setup => setup === 'Online')) {
      setPage(7);
    }
  };

  return (
    <div>
      <h2>STEP 1: About You</h2>
      <p>What is your office address?</p>

      <label htmlFor='address'>Address:</label>
      <input
        type='text'
        name='addressStreet'
        id='addressStreet'
        value={addressStreet}
        onChange={e => setAddressStreet(e.target.value)}
      />
      <label htmlFor='address'>Postal Code:</label>
      <input
        type='text'
        name='addressCode'
        id='addressCode'
        value={addressCode}
        onChange={e => setAddressCode(e.target.value)}
      />

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default OfficeAddress;
