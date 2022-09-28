import { instance } from "./axios";

const authAPI = {
  createUser: async (profile) => {
    try {
      const response = await instance.post("/api/join", profile, {headers : {"Content-Type" : "application/json"}});
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  loginUser: async (profile) => {
    try {
      const response = await instance.post("/login", JSON.stringify(profile));
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getLoginUserInfo: async (profile) => {
    try {
      const response = await instance.post(
        "/api/auth/userInfo",
        JSON.stringify(profile),
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authAPI;
