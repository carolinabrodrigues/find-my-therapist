import { useState, useEffect } from 'react';
import { getProfile } from '../api/matches.api';

function ClientProfile() {
  const [profile, setProfile] = useState(null);

  // how do I get the id?

  const getSingleProfile = async () => {
    try {
      const response = await getProfile(id);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProfile();
  }, []);

  return (
    <>
      <div className='ProfileHeader'>
        <h2>Client Name</h2>
        <p>Online</p> <p>Location</p>
      </div>
      <div className='ProfileDetails'>
        <h3>Preferences</h3>
        <p>Price per Session</p>
        <p>Up to 40€</p>

        <p>Psychological Approach</p>
        <p>Cognitive Behavioral</p>

        <h3>Personal Details</h3>
        <p>Age</p>
        <p>24 years old</p>
        <p>Gender</p>
        <p>Male</p>
      </div>
      <div className='ProfileActions'>
        <button>Dismiss</button>
        <button>Accept</button>
      </div>
    </>
  );
}

export default ClientProfile;
