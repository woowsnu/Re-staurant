import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
});

export const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // response에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      const errResponseStatus = error.response.status;
      const errResponseData = error.response.data;
      const prevRequest = error.config;
      // access token이 만료되어 발생하는 에러인 경우
      if (errResponseStatus === 401) {
        const refreshedToken = error.response.data.message;
        // console.log(error);
        // console.log(error.response);
        // console.log(error.response.data);
        // console.log(error.response.data.message);
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
