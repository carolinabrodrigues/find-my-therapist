import NavbarApp from '../components/NavbarApp';
import { AuthContext } from '../context/auth.context';
import { useContext, useEffect, useState, Fragment } from 'react';
import { getProfile, getUser, updateProfile } from '../api/matches.api';
import HTMLReactParser from 'html-react-parser';
import placeholder from '../assets/placeholderAvatar.svg';
import { ProfileContext } from '../context/profile.context';
import { useNavigate } from 'react-router-dom';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

function MyProfile() {
  const { user, setUser } = useContext(AuthContext);
  const { profile, setProfile } = useContext(ProfileContext);

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [therapySetup, setTherapySetup] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [psyApproach, setPsyApproach] = useState('');
  const [description, setDescription] = useState('');
  const [calendarLink, setCalendarLink] = useState('');
  const [price, setPrice] = useState(0);

  const locationOptions = [
    'Aveiro',
    'Beja',
    'Braga',
    'Bragança',
    'Castelo Branco',
    'Coimbra',
    'Évora',
    'Faro',
    'Guarda',
    'Leiria',
    'Lisboa',
    'Portalegre',
    'Porto',
    'Madeira',
    'Açores',
    'Santarém',
    'Setúbal',
    'Viana do Castelo',
    'Vila Real',
    'Viseu',
  ];

  const genderOptions = ['Female', 'Male', 'Transgender', 'Non-binary'];

  const approachOptions = [
    'Cognitive Behavioral',
    'Psychoanalytical',
    'Humanistic',
    'Systematic',
    'Constructionist',
  ];

  const getUserInfo = async id => {
    try {
      const response = await getUser(id);
      setUser(response.data);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfile = async id => {
    try {
      const response = await getProfile(id);
      setProfile(response.data);
      const profileData = response.data;
      setAge(response.data.age);
      setGender(response.data.gender);
      setLocation(response.data.location);
      setTherapySetup(response.data.therapySetup);
      setAddressStreet(response.data.addressStreet);
      setAddressCode(response.data.addressCode);
      setPsyApproach(response.data.psyApproach);
      setDescription(response.data.description);
      setCalendarLink(response.data.calendarLink);
      setPrice(response.data.price);

      return profileData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(user._id).then(response => {
      getUserProfile(response.profile).then(response => {
        // if there's no profile yet - redirect to Questions
        if (!response) {
          navigate('/questions');
        }
      });
    });
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = {
        age,
        gender,
        location,
        therapySetup,
        psyApproach,
        price,
        _id: user.profile,
      };
      await updateProfile(requestBody);

      /* trigger notification message */
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarApp />
      <div className='relative isolate overflow-hidden pt-14'>
        <div className='mx-auto max-w-7xl px-6 py-12 sm:py-12 lg:px-8'>
          {profile && (
            <div className='mx-auto max-w-6xl lg:mx-0 '>
              {/* settings component */}
              <div className='divide-y divide-black'>
                <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                  <div>
                    <h2 className='text-base font-semibold leading-7 text-black'>
                      Personal Information
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-zync-700'>
                      If you want to change this information, contact us.
                    </p>
                  </div>

                  <div className='md:col-span-2'>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                      <div className='col-span-full flex items-center gap-x-8'>
                        <div className='h-24 w-24 flex-none object-cover avatar-icon'>
                          {profile.picture ? (
                            HTMLReactParser(profile.picture)
                          ) : (
                            <img src={placeholder} />
                          )}
                        </div>
                      </div>

                      <div className='sm:col-span-full'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          Email
                        </label>
                        <div className='mt-2'>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          First Name
                        </label>
                        <div className='mt-2'>
                          <p>{user.firstName}</p>
                        </div>
                      </div>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          Last Name
                        </label>
                        <div className='mt-2'>
                          <p>{user.lastName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='divide-y divide-black'>
                <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
                  <div>
                    <h2 className='text-base font-semibold leading-7 text-black'>
                      Preferences
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-zync-700'>
                      You can change this information.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className='md:col-span-2'>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='gender'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          Gender
                        </label>
                        <div className='mt-2'>
                          <select
                            defaultValue={gender}
                            id='gender'
                            name='gender'
                            className='block w-full rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                            onChange={e => setGender(e.target.value)}
                          >
                            {genderOptions.map(option => {
                              return <option key={option}>{option}</option>;
                            })}
                          </select>
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='age'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          Age
                        </label>
                        <div className='mt-2'>
                          <input
                            value={age}
                            type='number'
                            name='age'
                            id='age'
                            className='block w-20 rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                            onChange={e => setAge(e.target.value)}
                          />
                        </div>
                      </div>

                      {user.isTherapist ? (
                        <div className='col-span-full'>
                          <div className='col-span-3'>
                            <label
                              htmlFor='location'
                              className='block text-sm font-medium leading-6 text-black'
                            >
                              Location
                            </label>
                            <div className='mt-2'>
                              <select
                                defaultValue={location}
                                id='location'
                                name='location'
                                className='block w-1/2 rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                                onChange={e => setLocation(e.target.value)}
                              >
                                {locationOptions.map(option => {
                                  return <option key={option}>{option}</option>;
                                })}
                              </select>
                            </div>

                            <div className='col-span-3 mt-6'>
                              <label
                                htmlFor='location'
                                className='block text-sm font-medium leading-6 text-black'
                              >
                                Office Address
                              </label>
                              <div className='mt-2 flex gap-5'>
                                <input
                                  value={addressStreet}
                                  type='text'
                                  name='addressStreet'
                                  id='addressStreet'
                                  className='block w-2/3 rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                                  onChange={e =>
                                    setAddressStreet(e.target.value)
                                  }
                                />
                                <input
                                  value={addressCode}
                                  type='text'
                                  name='addressCode'
                                  id='addressCode'
                                  className='block w-1/3 rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                                  onChange={e => setAddressCode(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='col-span-full'>
                          <label
                            htmlFor='location'
                            className='block text-sm font-medium leading-6 text-black'
                          >
                            Location
                          </label>
                          <div className='mt-2'>
                            <select
                              defaultValue={location}
                              id='location'
                              name='location'
                              className='block w-full rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                              onChange={e => setLocation(e.target.value)}
                            >
                              {locationOptions.map(option => {
                                return <option key={option}>{option}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      )}

                      <div className='col-span-full'>
                        <h3 className='block text-sm font-medium leading-6 text-black mb-3'>
                          Therapy Setup
                        </h3>
                        <CheckboxGroup
                          value={therapySetup}
                          onValueChange={setTherapySetup}
                          orientation='horizontal'
                          className='block text-sm leading-6 text-black'
                        >
                          <Checkbox value='Online'>Online</Checkbox>
                          <Checkbox value='In-person'>In-person</Checkbox>
                        </CheckboxGroup>
                      </div>
                      <div className='col-span-full'>
                        <h3 className='block text-sm font-medium leading-6 text-black mb-3'>
                          Psychological Approach
                        </h3>
                        <CheckboxGroup
                          value={psyApproach}
                          onValueChange={setPsyApproach}
                          orientation='horizontal'
                          className='block text-sm leading-6 text-black'
                        >
                          {approachOptions.map(approach => {
                            return (
                              <Checkbox key={approach} value={approach}>
                                {approach}
                              </Checkbox>
                            );
                          })}
                        </CheckboxGroup>
                      </div>

                      {user.isTherapist && (
                        <>
                          <div className='col-span-full'>
                            <label
                              htmlFor='gender'
                              className='block text-sm font-medium leading-6 text-black'
                            >
                              Professional Description
                            </label>
                            <div className='mt-2'>
                              <textarea
                                value={description}
                                rows={4}
                                type='text'
                                name='description'
                                id='description'
                                className='block w-full rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                                onChange={e => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className='sm:col-span-3'>
                            <label
                              htmlFor='calendarLink'
                              className='block text-sm font-medium leading-6 text-black'
                            >
                              Calendar Link
                            </label>
                            <div className='mt-2'>
                              <input
                                value={calendarLink}
                                type='text'
                                name='calendarLink'
                                id='calendarLink'
                                className='block w-full rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                                onChange={e => setCalendarLink(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='price'
                          className='block text-sm font-medium leading-6 text-black'
                        >
                          Price per session
                        </label>
                        <div className='relative'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <span className='text-gray-500 sm:text-sm'>€</span>
                          </div>
                          <input
                            value={price}
                            type='number'
                            name='price'
                            id='price'
                            onChange={e => setPrice(e.target.value)}
                            className='block mt-2 w-20 pl-7 rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                            aria-describedby='price-currency'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-8 flex'>
                      <button
                        type='submit'
                        className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end mt-16'>
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <CheckCircleIcon
                      className='h-6 w-6 text-green-400'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>
                      Profile successfully updated!
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      You can go check new matches that fit your new
                      preferences.
                    </p>
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
