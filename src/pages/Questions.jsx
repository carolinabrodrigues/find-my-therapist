import { useContext } from 'react';
import { ProfileContext } from '../context/profile.context';
import { AuthContext } from '../context/auth.context';
import Age from '../components/questions/Age';
import Gender from '../components/questions/Gender';
import Location from '../components/questions/Location';
import TherapySetup from '../components/questions/TherapySetup';
import PsyApproach from '../components/questions/PsyApproach';
import PriceImportant from '../components/questions/PriceImportant';
import Price from '../components/questions/Price';
import OfficeAddress from '../components/questions/OfficeAddress';
import CalendarLink from '../components/questions/CalendarLink';
import Description from '../components/questions/Description';

function Questions() {
  const { setProfile, handleSubmit, page, setPage } =
    useContext(ProfileContext);

  //const { user } = useContext(AuthContext);

  const showQuestions = () => {
    if (page === 1) {
      return <Age />;
    }
    if (page === 2) {
      return <Gender />;
    }
    if (page === 3) {
      return <Location />;
    }
    if (page === 4) {
      return <TherapySetup />;
    }
    if (page === 5) {
      return <OfficeAddress />;
    }
    if (page === 6) {
      return <CalendarLink />;
    }
    if (page === 7) {
      return <PsyApproach />;
    }
    if (page === 8) {
      return <Description />;
    }
    if (page === 9) {
      return <PriceImportant />;
    }
    if (page === 10) {
      return <Price />;
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      {showQuestions()}

      {/* <form>
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
      </form> */}
    </div>
  );
}

export default Questions;
