import { instance } from './axios';

// 검색 API 여기에 추가
const resInfoAPI = {
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
  getUserBookMark: async () => {
    const userEmail = localStorage.getItem('email');
    const { data } = await instance.get(
      `/restaurantlike/${userEmail}/auth/findUserView`
    );
    return data;
  },
  createUserBookMark: async (bookmarkData) => {
    const { data } = await instance.post(
      `/restaurantlike/auth/createLike/`, bookmarkData
    );
    return data;
  },
  deleteUserBookMark: async (likeIndex) => {
    const { data } = await instance.delete(
      `/restaurantlike/auth/deleteLike/${likeIndex}`
    );
    return data;
  },
};

export default resInfoAPI;
