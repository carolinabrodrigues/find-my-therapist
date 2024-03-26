import axios from 'axios';

const avatarAPI = `${
  import.meta.env.VITE_EXTERNAL_API
}?backgroundColor=eef2ff&clothingColor=e4e4e7&face=smile&maskProbability=0&facialHairProbability=0&seed=Felix`;

// function to be used to generate several options
export const getAvatar = avatarQuery => {
  return axios.get(`${avatarAPI}${avatarQuery}`);
};
