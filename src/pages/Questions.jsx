import { useState } from 'react';

function Questions() {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [therapySetup, setTherapySetup] = useState([]);
  const [psyApproach, setPsyApproach] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [calendarLink, setCalendarLink] = useState('');

  return (
    <div>
      <form>
        <h1>STEP 1: About You</h1>
        <p>How old are you?</p>
        <input
          type='number'
          name='age'
          id='age'
          value={age}
          onChange={e => setAge(e.target.value)}
        />

        <p>What is your gender?</p>
        <input
          type='text'
          name='gender'
          id='gender'
          value={gender}
          onChange={e => setGender(e.target.value)}
        />

        <p>What is your location?</p>
        <input
          type='text'
          name='location'
          id='location'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <p>What is your preference in the therapy setup?</p>
        <input
          type='text'
          name='therapySetup'
          id='therapySetup'
          value={therapySetup}
          onChange={e => setTherapySetup(e.target.value)}
        />

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

        <p>What is your calendar link?</p>
        <input
          type='text'
          name='calendarLink'
          id='calendarLink'
          value={calendarLink}
          onChange={e => setCalendarLink(e.target.value)}
        />

        <h1>STEP 2: Expertise & Approach</h1>
        <p>What is the psychological approach you can relate to?</p>
        <input
          type='text'
          name='psyApproach'
          id='psyApproach'
          value={psyApproach}
          onChange={e => setPsyApproach(e.target.value)}
        />
        <p>Can you provide a brief professional description?</p>
        <input
          type='text'
          name='description'
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <h1>STEP 3: Costs</h1>
        <p>Is the price important for you?</p>
        <input type='text' name='price' id='price' value={price} />

        <p>What is the most that you are willing to pay per session?</p>
        <input
          type='number'
          name='price'
          id='price'
          value={price}
          min={0}
          max={400}
          onChange={e => setPrice(e.target.value)}
        />

        <button type='submit'>Finish</button>
      </form>
    </div>
  );
}

export default Questions;
