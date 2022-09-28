# ERD
![image](https://user-images.githubusercontent.com/99165573/192792845-1fa2439c-e2e5-4c22-bdc0-5646bb013399.png)
- 링크 : https://www.erdcloud.com/d/cgGQJj8g4hhMfWDwF


# 디렉터리 폴더 구조
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

# API

- 회원 접근 권한 설정 api 구분

| 구분 | 설명                       |
| ----------------------------------- | -------------------------- |
| **/api** | 비회원 접근 권한 부여|
| **/api/auth** |비회원 접근 권한 미부여|


![image](https://user-images.githubusercontent.com/99165573/192733254-8a470f33-e722-47bb-b317-1b9e89d93567.png)

# 주요 어노테이션 (Annotation) 정리

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

# 주요 메서드 (Method) 정리
 
 

