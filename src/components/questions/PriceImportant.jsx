import { useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';

function PriceImportant() {
  const [priceImportant, setPriceImportant] = useState('');
  const { profile, setProfile, setPage } = useContext(ProfileContext);

  const handleNext = () => {
    if (priceImportant === 'no') {
      setProfile({ ...profile, price: 0 }); // Set price to 0 if not important
      console.log('profile inside handle next', profile);
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
