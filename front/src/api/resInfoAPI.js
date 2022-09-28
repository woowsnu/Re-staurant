import { instance } from './axios';

// 검색 API 여기에 추가
const resInfoAPI = {
  getOneRestaurantInfo: async (busId) => {
    try {
      const { data } = await instance.get(`/api/restaurantDetail/${busId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getUserBookMark: async () => {
    const token = localStorage.getItem('accessToken');
    const { data } = await instance.get(`/api/auth/findUserLike`, {
      headers: { Authorization: token },
    });
    console.log('api에서', data);
    return data;
  },
  createUserBookMark: async (busId) => {
    const token = localStorage.getItem('accessToken');
    const { data } = await instance.post(
      `/api/auth/createLike?busId=${busId}`,
      '',
      { headers: { 'Content-Type': 'application/json', Authorization: token }}
    );
    return data;
  },
  deleteUserBookMark: async (busId) => {
    const token = localStorage.getItem('accessToken');
    const response = await instance.delete(
      `/api/auth/deleteLike?busId=${busId}`,
      { headers: { Authorization: token } }
    );
    return response;
  },
  createReview: async (busId, reviewData) => {
    const token = localStorage.getItem('accessToken');
    const response = await instance.post(
      `/api/auth/createReview?busId=${busId}`,
      reviewData,
      { headers: { Authorization: token, 'Content-Type': 'application/json' } }
    );
    return response;
  },
};

export default resInfoAPI;
