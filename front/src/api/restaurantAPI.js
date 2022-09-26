import { instance } from './axios';

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
      `/restaurant/restaurantDetail/${busId}`
    );
    return data;
  },
};

export default restaurantAPI;
