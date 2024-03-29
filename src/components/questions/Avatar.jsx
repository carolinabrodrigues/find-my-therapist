/* eslint-disable no-undef */
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../context/profile.context';
import HTMLReactParser from 'html-react-parser';
import { getAvatar } from '../../api/avatar.api';
import { RadioGroup } from '@headlessui/react';
import LoadingSpinner from '../LoadingSpinner';

function Avatar() {
  const { profile, setProfile, setPage } = useContext(ProfileContext);
  const [picture, setPicture] = useState(null);
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleNext = () => {
    console.log(picture);
    setProfile({ ...profile, picture });

    setPage(2);
  };

  const hairTypes = ['&head=noHair1', '&head=afro', '&head=long'];

  const hairTypesCustom = ['&head=bangs', '&head=grayShort'];

  const hairColors = [
    '&headContrastColor=000000',
    '&headContrastColor=f5d78d',
    '&headContrastColor=ff5050',
    '&headContrastColor=a3b4d4',
  ];

  const skinColors = [
    '&skinColor=694d3d',
    '&skinColor=ffdbb4',
    '&skinColor=edb98a',
  ];

  const generateQueries = () => {
    let queriesArray = [];
    for (let i = 0; i < hairTypesCustom.length; i++) {
      for (let j = 0; j < hairColors.length; j++) {
        for (let h = 0; h < skinColors.length; h++) {
          queriesArray.push(
            `${hairTypesCustom[i]}${hairColors[j]}${skinColors[h]}`
          );
        }
      }
    }

    for (let i = 0; i < hairTypes.length; i++) {
      for (let h = 0; h < skinColors.length; h++) {
        queriesArray.push(`${hairTypes[i]}${skinColors[h]}`);
      }
    }
    return queriesArray;
  };

  const getPictures = async avatarQuery => {
    try {
      const response = await getAvatar(avatarQuery);
      let data = `${response.data}`;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPictures = async queries => {
    try {
      let allOptions = [];
      for (let i = 0; i < queries.length; i++) {
        const response = await getPictures(queries[i]);
        allOptions.push(response);
      }
      return allOptions;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const queries = generateQueries();
    getAllPictures(queries).then(response => {
      setAvatarOptions(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading === false ? (
        <div className='my-36 mx-auto max-w-9xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl flex justify-center'>
            <div>
              <h1 className='text-base font-semibold py-6 text-center'>
                STEP 1: About You
              </h1>

              <h2 className='text-3xl font-bold text-center pb-6'>
                Pick your avatar
              </h2>

              <RadioGroup value={picture} className='mt-2'>
                <div className='grid grid-cols-7'>
                  {avatarOptions.length > 0 &&
                    avatarOptions.map(option => (
                      <RadioGroup.Option
                        key={avatarOptions.indexOf(option)}
                        value={option}
                        onClick={() => setPicture(option)}
                        className={({ active, checked }) =>
                          classNames(
                            option
                              ? 'cursor-pointer focus:outline-none'
                              : 'cursor-not-allowed opacity-25',
                            active
                              ? 'ring-2 ring-indigo-600 ring-offset-2'
                              : '',
                            checked
                              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                              : ' bg-white text-gray-900 hover:bg-gray-50',
                            'flex items-center justify-center rounded-md py-1 px-1 text-sm font-semibold uppercase sm:flex-1'
                          )
                        }
                      >
                        <RadioGroup.Label as='span' className='w-20'>
                          {HTMLReactParser(option)}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                </div>
              </RadioGroup>

              <div className='fixed inset-x-0 bottom-0 bg-white flex h-min p-6 justify-center gap-20'>
                <button
                  onClick={handleNext}
                  className='rounded-full bg-indigo-600 px-32 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Avatar;
