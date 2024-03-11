import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Description() {
  const [description, setDescription] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, description });

    setPage(8);
  };

  return (
    <div>
      <h2>STEP 2: Expertise & Approach</h2>
      <p>Can you provide a brief professional description?</p>

      <input
        type='text'
        name='description'
        id='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Description;
