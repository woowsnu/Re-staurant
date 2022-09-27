import { instance } from './axios';

const authAPI = {
  getLoginUserInfo: async () => {
    const profile = { email : local}
    try {
      const { data } = await instance.get(
        `/restaurant/restaurantDetail/${busId}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authAPI;
