import { instance } from './axios';

const userEmail = localStorage.getItem('email');

const restaurantAPI = {
  getOneRestaurantInfo: async (busId) => {
    try {
      const { data } = await instance.get(
        `/restaurant/restaurantDetail/${busId}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getUserBookMark: async (busId) => {
    const { data } = await instance.get(
      `/restaurantlike/auth/findUserView/${busId}`
    );
    return data;
  },
};

export default restaurantAPI;


// const res = await instance.get(
//   `/restaurant/${userEmail}/auth/findUserView`,
//   {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//   }
// );
// setBookmark(res.data);
