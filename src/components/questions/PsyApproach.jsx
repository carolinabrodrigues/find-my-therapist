import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';

function PsyApproach() {
  const [psyApproach, setPsyApproach] = useState([]);
  const { profile, setProfile, setPage } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleCognitive = () => {
    setPsyApproach(prevApproach => {
      if (prevApproach.includes('Cognitive Behavioral')) {
        return prevApproach.filter(
          approach => approach !== 'Cognitive Behavioral'
        );
      } else {
        return [...prevApproach, 'Cognitive Behavioral'];
      }
    });
  };

  const handleHumanistic = () => {
    setPsyApproach(prevApproach => {
      if (prevApproach.includes('Humanistic')) {
        return prevApproach.filter(approach => approach !== 'Humanistic');
      } else {
        return [...prevApproach, 'Humanistic'];
      }
    });
  };

  const handleNext = () => {
    setProfile({ ...profile, psyApproach });
    console.log('profile inside handle next', profile);

    // if user is therapist - go to page 8
    if (user.isTherapist) {
      setPage(8);
    } else {
      // if user is client - go to page 9
      setPage(9);
    }
  };

  return (
    <div>
      <h2>STEP 2: Expertise & Approach</h2>
      {/* show a different question if it's therapist */}
      <p>What is the psychological approach you can relate to?</p>

      <input
        type='checkbox'
        id='cognitive'
        name='cognitive'
        onChange={handleCognitive}
      />
      <label htmlFor='cognitive'>Cognitive Behavioral</label>
      <input
        type='checkbox'
        id='humanistic'
        name='humanistic'
        onChange={handleHumanistic}
      />
      <label htmlFor='humanistic'>Humanistic</label>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default PsyApproach;
