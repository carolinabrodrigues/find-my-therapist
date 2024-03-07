import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function Price() {
  const [price, setPrice] = useState(0);
  const { profile, setProfile, handleSubmit } = useContext(ProfileContext);

  const handleNext = () => {
    setProfile({ ...profile, price: parseInt(price) });
    console.log('profile inside handle next', profile); // -> doesn't include the price due to async nature of react states
    //handleSubmit();
  };

  return (
    <div>
      <h2>STEP 3: Price</h2>
      {/* create another question for the therapist */}
      <p>What is the most that you are willing to pay per session?</p>
      <input
        type='number'
        name='price'
        id='price'
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Price;
