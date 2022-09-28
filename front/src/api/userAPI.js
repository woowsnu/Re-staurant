import { instance } from "./axios";

const userAPI = {
  followUser: async (profile) => {
    try {
      const { data } = await instance.post(
        "/api/auth/following",
        JSON.stringify(profile),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userAPI;
