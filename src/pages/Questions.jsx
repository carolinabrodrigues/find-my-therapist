import { useContext } from 'react';
import { ProfileContext } from '../context/profile.context';
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
import Confirmation from '../components/questions/Confirmation';
import NavbarApp from '../components/NavbarApp';
import Avatar from '../components/questions/Avatar';

function Questions() {
  const { page } = useContext(ProfileContext);

  // GET Profile from the user

  const showQuestions = () => {
    if (page === 1) {
      return <Avatar />;
    }
    if (page === 2) {
      return <Age />;
    }
    if (page === 3) {
      return <Gender />;
    }
    if (page === 4) {
      return <Location />;
    }
    if (page === 5) {
      return <TherapySetup />;
    }
    if (page === 6) {
      return <OfficeAddress />;
    }

    if (page === 7) {
      return <PsyApproach />;
    }
    if (page === 8) {
      return <Description />;
    }
    if (page === 9) {
      return <CalendarLink />;
    }
    if (page === 10) {
      return <PriceImportant />;
    }
    if (page === 11) {
      return <Price />;
    }
    if (page === 12) {
      return <Confirmation />;
    }
  };

  return (
    <div>
      <NavbarApp />
      {showQuestions()}
    </div>
  );
}

export default Questions;
