# RE:STAURANT

> 또 가고 싶은 인생 맛집 찾기! RE:STAURANT

## 💡 팀 소개

| [<img src="https://avatars.githubusercontent.com/u/105709187?v=4" width="140px" /> ](https://github.com/woowsnu) |[<img src="https://avatars.githubusercontent.com/u/102015738?v=4" width="140px" /> ](https://github.com/deeun)  |[<img src="https://avatars.githubusercontent.com/u/67572011?v=4" width="140px" /> ](https://github.com/gun-0208)  | [<img src="https://avatars.githubusercontent.com/u/66675699?v=4" width="140px" /> ](https://github.com/vsuminv)|[<img src="https://avatars.githubusercontent.com/u/99165573?v=4" width="140px" /> ](https://github.com/nikeisme) |
|--|--|--|--|--|
| **문선화**  |**최지원**  |**강건** |**이수민** |**황유정** |
| 프론트엔드  |프론트엔드  |백엔드, 배포 <br>데이터 크롤링  |백엔드 |백엔드 |
<br />
<br />

## 프로젝트 소개

https://foam-tendency-a06.notion.site/RE-STAURANT-ee29783ffaba4b6593e290616239fc21

## ⭐ 배포 링크

<br />
<br />
---

## 📚 기술스택

## 프론트엔드

### 📁 폴더 구조
```
   📦src  
 ┣ 📂api  
 ┣ 📂assets  
 ┃ ┗ 📂images  
 ┣ 📂component  
 ┃ ┣ 📂Auth  
 ┃ ┣ 📂Layout  
 ┃ ┣ 📂MyPage  
 ┃ ┃ ┣ 📂EditUserInfo  
 ┃ ┃ ┣ 📂Follow  
 ┃ ┃ ┣ 📂MyReview  
 ┃ ┣ 📂Restaurant  
 ┃ ┃ ┣ 📂Chart  
 ┃ ┣ 📂Review  
 ┃ ┗ 📂UI    
 ┣ 📂routes  
 ┣ 📂store  
 ┣ 📂styles  
 ┣ 📜App.css  
 ┣ 📜App.js  
 ┣ 📜index.css  
 ┗ 📜index.js
```
| 구분 | 설명                       |
| ----------------------------------- | -------------------------- |
| **/api** | api 호출 관련 파일 분리 (axios 인스턴스 설정 파일 관리) |
| **/assets** | 이미지 소스 관리|
| **/compoenents**  | 페이지에서 사용되는 컴포넌트 관리 |
| **/components/UI**  | 공통 컴포넌트 관리 |
| **/router**  | 페이지 단위의 컴포넌트 관리 |
| **/store**  | context 파일 관리 |
| **/styles**  | 전역 스타일을 관리 |
---
### 라우팅 
* react-router-dom 사용해 주소값 변경에 따른 페이지 렌더링 구현
* 로그인 상태는 ContextAPI 사용하여 관리하고,  ContextAPI + Private Router 로 로그인 필요 시 유저 리다이렉트 처리
* 페이지 목록

| 권한 | 경로 | 설명 |
| --- | --- |------ |
| **비회원 접근 가능** | / | 메인페이지
|  | /search/:keyword | 검색 페이지
|  | /detail/:id | 식당 상세 페이지 |
|  | /login | 로그인 페이지 |
| | /members | 회원가입 페이지 |
| | /mypage/:nickname  | 다른 유저의 마이페이지 |
| **회원 접근 가능** | /mypage | 로그인한 유저의 마이페이지 |
| |/review/:id | 로그인 유저의 마이페이지 |

* 접근 제한(리다이렉트) 구현 부분
```
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProtectedRoutes = () => {
const ctx = useContext(AuthContext);
return ctx.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
```
---
### HTTP 통신 - Axios 라이브러리 사용
- fetch 대비 브라우저 호환성이 좋고 사용이 쉬운 axios사용
- axios instance 생성하여 baseURL, header, 등을 미리 설정해 코드 중복을 제거하고, 편리하게 사용
```
import axios from 'axios';
const token = localStorage.getItem('accessToken');

export const instance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: token ? { 
		Authorization: token, } 
		: {}, 
});
```
- interceptor 기능 사용 :  axios에서 기본으로 제공되는 HTTP Request Intercept 기능을 사용해 accessToken 만료 시 새로운 토큰을 받아 저장 후 이전 요청을 재요청하는 로직 구현해 로그인 상태 유지
```
instance.interceptors.response.use(
(res) => { return res;
},
async (error) => {
	try { const errResponseStatus = error.response.status;
	const prevRequest = error.config;
	if (errResponseStatus === 401) {
	const refreshedToken = error.response.data.message;
	prevRequest.headers.Authorization = refreshedToken;
	localStorage.setItem('accessToken', refreshedToken);
	return await axios(prevRequest); }
	}
	catch (e) {
	return Promise.reject(e);
} } );
```
---
### 스타일링
-  module css 와 react-icon, 이모지 사용하여 스타일링
- react-icon : 적용하기 편리, 이미지 삽입 했을 때보다 로딩 시간이 빠름
- 유저 편의성을 위해 반응형 웹 구현 (미디어 쿼리 사용)
    -   벤치마킹 사이트(캐치테이블, 다이닝코드) 참고하여 break point 설정
        -   web : 940px
        -   mobile : 480px

(반응형 적용된 화면 gif 넣기 or 영상으로 소개)

- 서버 api 요청 후 응답 받기 전까지 프론트 화면에 표시되는 로딩 상태 UI 구현 
(로딩 gif 넣기 / or 영상으로 소개)

---
