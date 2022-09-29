# RE:STAURANT

> 또 가고 싶은 인생 맛집 찾기! RE:STAURANT

## 💡 팀 소개

| [<img src="https://avatars.githubusercontent.com/u/105709187?v=4" width="140px" /> ](https://github.com/woowsnu) |[<img src="https://avatars.githubusercontent.com/u/102015738?v=4" width="140px" /> ](https://github.com/deeun)  |[<img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6ix8tEeNCh8/v0/-1x-1.jpg" width="140px" /> ](https://github.com/gun-0208)  | [<img src="https://image.bugsm.co.kr/album/images/200/40741/4074162.jpg?version=20220415014400.0" width="140px" /> ](https://github.com/vsuminv)|[<img src="https://ca.slack-edge.com/T032WHU0K1C-U0333C3JCKY-0eacb53555e9-512" width="140px" /> ](https://github.com/nikeisme) |
|--|--|--|--|--|
| **문선화**  |**최지원**  |**강건** |**이수민** |**황유정** |
| 프론트엔드  |프론트엔드  |백엔드, 배포 <br>데이터 크롤링  |백엔드 |백엔드 |
<br />
<br />

## 프로젝트 소개

https://foam-tendency-a06.notion.site/RE-STAURANT-ee29783ffaba4b6593e290616239fc21

## ⭐ 배포 링크
http://43.200.202.164:3000/

## 📚 기술스택
프론트엔드<br/>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<br/>
백엔드<br/>
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 
<br/>
인프라<br/>
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
<br />
협업툴 <br/>
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

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

## 백엔드 

### ERD
![image](https://user-images.githubusercontent.com/99165573/192798794-8dbd87b9-d50d-4419-87d7-b931c3971431.png)
- 링크 : https://www.erdcloud.com/d/cgGQJj8g4hhMfWDwF


###  📁 폴더 구조
```bash
📦back
 ┣ 📂app
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂restaurant
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂app
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PrincipalDetails.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PrincipalDetailsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtAuthorizationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CorsConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MenusController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OptionsController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantLikeController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewPhotoController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VotedKeywordsController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MenusDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OptionsDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ResponseDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantLikeDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewPhotoDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VotedKeywordsDTO.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Follow.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Menus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Options.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Restaurant.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantLike.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Review.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewPhoto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜User.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VotedKeywords.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MenusRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OptionsRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantLikeRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewPhotoRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VotedKeywordsRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MenusService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OptionsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantLikeService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RestaurantService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewIPhotoService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VotedKeywordsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AppApplication.java
 ┃ ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┃ ┗ 📜application.properties
 ┃ ┃ ┗ 📂test
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜build.gradle
 ┗ 📂lib
```

| 구분 | 설명                       |
| ----------------------------------- | -------------------------- |
| **/config** | SpringSecurity principal 개체, jwt 관리|
| **/controller** | 웹 브라우저의 요청 전담 처리 |
| **/service**  | 데이터를 전달받아 가공 처리  |
| **/repository**  | DB에 접근하는 메서드 관리 |
| **/DTO**  | 계층 간 데이터 교환을 위해 사용되는 객체 관리 |
| **/model**  | Controller에서 생성한 데이터를 담아서 View로 전달할 때 사용하는 객체 관리 |

### API

- 회원 접근 권한 설정 api 구분

| 구분 | 설명                       |
| ----------------------------------- | -------------------------- |
| **/api** | 비회원 접근 권한 부여|
| **/api/auth** |비회원 접근 권한 미부여|


![image](https://user-images.githubusercontent.com/99165573/192733254-8a470f33-e722-47bb-b317-1b9e89d93567.png)

### 주요 어노테이션 (Annotation) 정리

- <h3>Config<h3>
![image](https://user-images.githubusercontent.com/99165573/192782693-9b242e5e-4442-4779-8781-bd6e2ad483e4.png)

- <h3>Controller<h3>
![image](https://user-images.githubusercontent.com/99165573/192778451-daabca26-290b-4f79-84af-ea1200d17da3.png) <br>

- <h3>Service<h3>
![image](https://user-images.githubusercontent.com/99165573/192778643-53a521a1-9313-4b4f-8e9f-f4859738e7fd.png) <br>

- <h3>Repository<h3>
![image](https://user-images.githubusercontent.com/99165573/192778787-38ad5948-b354-4aec-91ee-2b1bb27ffb32.png) <br>

- <h3>DTO<h3>
![image](https://user-images.githubusercontent.com/99165573/192779527-5a4df524-8001-4da3-8502-b0e65fdd9bd7.png) <br>

- <h3>Model<h3>
![image](https://user-images.githubusercontent.com/99165573/192781838-31655fc1-5b12-4dcb-af50-0352c07f22f7.png) <br>


 ### 주요 메서드 (Method) 정리
 
| 메소드 명 | 설명                       |
| ----------------------------------- | -------------------------- |
| **save()** |새 엔티티를 추가 또는 업데이트하는 메서드|
| **findAll()** | 전체 데이터 조회|
| **findById()** |특정 데이터 조회|
| **deleteById()** |조건에 해당하는 데이터 삭제|
| **findTop10AllByOrderByAuthorCountDesc()** |상위 10개 내림차순 정렬|
| **findRestaurantByRestaurantCategoryContainingOrRestaurantNameContaining()** |특정 단어 검색 시 관련 식당 조회 가능(sql like 명령어와 유사)|


---
	
## 트러블슈팅
	
### 프론트엔드
	
### 백엔드
