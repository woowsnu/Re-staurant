import { instance } from './axios';

// 검색 API 여기에 추가
const resInfoAPI = {
  getOneRestaurantInfo: async (busId) => {
    try {
      const { data } = await instance.get(
        `/api/restaurantDetail/${busId}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getUserBookMark: async () => {
    const { data } = await instance.get(
      `/api/auth/findUserLike`
    );
    console.log("api에서", data)
    return data;
  },
  createUserBookMark: async (busId) => {
    const { data } = await instance.post(
      `/api/auth/createLike?busId=${busId}`
    );
    return data;
  },
  deleteUserBookMark: async (busId) => {
    const response = await instance.delete(
      `/api/auth/deleteLike?busId=${busId}`
    );
    return response;
  },
};

export default resInfoAPI;
