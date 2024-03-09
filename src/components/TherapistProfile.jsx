import React from 'react';

function TherapistProfile() {
  return (
    <>
      <div className='ProfileHeader'>
        <h2>Therapist Name</h2>
        <p>Online</p> <p>Location</p>
        <p>PsyApproach</p>
      </div>
      <div className='ProfileDetails'>
        <h3>Professional Summary</h3>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source.
        </p>
        <h3>Personal Details</h3>
        <p>Age</p>
        <p>24 years old</p>
        <p>Gender</p>
        <p>Male</p>
        <h3>Session Details</h3>
        <p>Price per Session</p>
        <p>40€</p>
        <p>Office Address</p>
        <p>R. do Instituto Virgílio Machado 14 1100-284 Lisboa, Portugal</p>
      </div>
      <div className='ProfileActions'>
        <button>Not Interested</button>
        <button>Like</button>
      </div>
    </>
  );
}

export default TherapistProfile;
