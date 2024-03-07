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
  const { page, setPage } = useContext(ProfileContext);

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
    </div>
  );
}

export default Questions;
