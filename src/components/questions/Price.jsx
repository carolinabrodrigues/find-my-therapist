import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';

function Price() {
  const [price, setPrice] = useState(0);
  const { profile, setProfile, handleSubmit, setPage } =
    useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleNext = () => {
    // setProfile({ ...profile, user: user._id, price: parseInt(price) });
    const newProfile = { ...profile, user: user._id, price: parseInt(price) };
    console.log('new profile inside handle next', newProfile);
    handleSubmit(newProfile);
    setPage(11);
  };

  return (
    <div>
      <h2>STEP 3: Price</h2>
      {/* create another question for the therapist */}
      {user.isTherapist ? (
        <p>What is your price per session?</p>
      ) : (
        <p>What is the most that you are willing to pay per session?</p>
      )}
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
