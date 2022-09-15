import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    try {
      const errResponseStatus = error.response.status;
      const prevRequest = error.config;
      if (errResponseStatus === 401) {
        const refreshedToken = error.response.data.message;
        console.log(refreshedToken);
        console.log("prevRequest",prevRequest);
        prevRequest.headers.Authorization = refreshedToken;
        localStorage.setItem("accessToken", refreshedToken);
        return await axios(prevRequest);
      }
    } catch (e) {
      // 오류 내용 출력 후 요청 거절
      return Promise.reject(e);
    // console.log(e);
    }
  }
);
