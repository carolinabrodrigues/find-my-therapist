import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import { AuthContext } from '../../context/auth.context';

function PriceImportant() {
  const [priceImportant, setPriceImportant] = useState('');
  const { user } = useContext(AuthContext);
  const { profile, setProfile, setPage, handleSubmit } =
    useContext(ProfileContext);

  const handleNext = () => {
    if (priceImportant === 'no') {
      setProfile({ ...profile, price: 0, user: user._id }); // Set price to 0 if not important
      const newProfile = { ...profile, user: user._id, price: 0 };
      console.log('new profile inside handle next', newProfile);
      handleSubmit(newProfile);
    } else {
      setPage(10); // Proceed to next question if price is important
    }
  };

  return (
    <div>
      <h2>STEP 3: Price</h2>
      <p>Is the price important for you?</p>

      <select
        id='priceImportant'
        name='priceImportant'
        onChange={e => setPriceImportant(e.target.value)}
      >
        <option value=''>Select</option>
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
      </select>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default PriceImportant;
