import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import RestaurantProfile from "./RestaurantProfile";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantReview from "./RestaurantReview";
import RestaurantTab from "./RestaurantTab";

const MENUS = [
  {
    "id": 1,
    "name": "삼겹살",
    "price": 16000
  },
  {
    "id": 2,
    "name": "항정살",
    "price": 17000
  },
  {
    "id": 3,
    "name": "목살",
    "price": 16000
  },
  {
    "id": 4,
    "name": "갈매기살",
    "price": 17000
  },
  {
    "id": 5,
    "name": "우삼겹",
    "price": 15000
  },
  {
    "id": 6,
    "name": "껍데기",
    "price": 7000
  },
  {
    "id": 7,
    "name": "된장찌개",
    "price": 6000
  },
  {
    "id": 8,
    "name": "소주",
    "price": 4000
  }
]

const REVIEWS = [
  {
    "id": 1,
    "user": {
      "userId": 1,
      "name": "서초동 비스트",
      "profileImg": "https://cdn.pixabay.com/photo/2016/11/29/10/07/tiger-1868911_960_720.jpg"
    },
    "comment": "맛있어요",
    "review": "웨이팅 있지만 맛은 굿",
    "date": "2022-08-12",
    "revisit": 1,
    "img": [
      {
        "id": 1,
        "url": "https://cdn.pixabay.com/photo/2019/01/26/02/09/buffet-3955616_960_720.jpg"
      },
      {
        "id": 2,
        "url": "https://cdn.pixabay.com/photo/2016/11/29/09/00/doughnuts-1868573_960_720.jpg"
      },
      {
        "id": 3,
        "url": "https://cdn.pixabay.com/photo/2016/11/29/09/00/doughnuts-1868573_960_720.jpg"
      },
      {
        "id": 4,
        "url": "https://cdn.pixabay.com/photo/2016/11/29/09/00/doughnuts-1868573_960_720.jpg"
      },
      {
        "id": 5,
        "url": "https://cdn.pixabay.com/photo/2016/11/29/09/00/doughnuts-1868573_960_720.jpg"
      }
    ]
  },
  {
    "id": 2,
    "user": {
      "userId": 2,
      "name": "My 동석",
      "profileImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8bzNsK42l6AuLThyLkh8YjGdtwTPFOpnwrg&usqp=CAU"
    },
    "comment": "맛없어요",
    "review": "다신 안가용",
    "date": "2022-08-13",
    "revisit": 0,
    "img": [
      {
        "id": 1,
        "url": "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg"
      }
    ]
  },
  {
    "id": 3,
    "user": {
      "userId": 3,
      "name": "한섬만두",
      "profileImg": "https://item.kakaocdn.net/do/1de373d43a00ab0a7aba7e149b2142c3d0bbab1214a29e381afae56101ded106"
    },
    "comment": "재방문 의사 100%",
    "review": "전통적인 요리법이나 양식은 상당한 차이가 있지만, 이탈리아 요리는 다른 국가의 요리 문화에서 다양한 영감을 줄 만큼 다양하고 혁신적인 것으로 평가되고 있다. 각 지방마다 고유의 특색이 있어 그 양식도 다양하지만 크게 북부와 남부로 나눌 수 있다. 다른 나라와 국경을 맞대고 있던 북부 지방은 산업화되어 경제적으로 풍족하고 농업이 발달해 쌀이 풍부해 유제품이 다양한 반면 경제적으로 침체되었던 남부 지방은 올리브와 토마토, 모차렐라 치즈가 유명하고 특별히 해산물을 활용한 요리가 많다. 식재료와 치즈 등의 차이는 파스타의 종류와 소스와 수프 등도 다름을 의미한다. 전통적인 요리법이나 양식은 상당한 차이가 있지만, 이탈리아 요리는 다른 국가의 요리 문화에서 다양한 영감을 줄 만큼 다양하고 혁신적인 것으로 평가되고 있다. 각 지방마다 고유의 특색이 있어 그 양식도 다양하지만 크게 북부와 남부로 나눌 수 있다. 다른 나라와 국경을 맞대고 있던 북부 지방은 산업화되어 경제적으로 풍족하고 농업이 발달해 쌀이 풍부해 유제품이 다양한 반면 경제적으로 침체되었던 남부 지방은 올리브와 토마토, 모차렐라 치즈가 유명하고 특별히 해산물을 활용한 요리가 많다. 식재료와 치즈 등의 차이는 파스타의 종류와 소스와 수프 등도 다름을 의미한다.",
    "date": "2022-08-11",
    "revisit": 1,
    "img": [
      {
        "id": 1,
        "url": "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg"
      }
    ]
  },
  {
    "id": 4,
    "user": {
      "userId": 5,
      "name": "감자탕",
      "profileImg": null
    },
    "comment": "재방문 의사 100%",
    "review": "두그릇 뚝딱 했어요",
    "date": "2022-08-09",
    "revisit": 1,
    "img": null
  }
]

const OPTIONS = [
  {
    "id": 2,
    "name": "주차",
    "isCheck": "1",
    "order": 1,
    "iconURL": "http://static.naver.net/maps2/ic_endinfo2.png",
    "desc": ""
  },
  {
    "id": 4,
    "name": "포장",
    "isCheck": "1",
    "order": 3,
    "iconURL": "http://static.naver.net/maps2/ic_endinfo4.png",
    "desc": ""
  }
]

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState([]);
    const restaurantid = useParams().id;
    
    // restaurant data fetch
    const fetchRestaurantData = async () => {
      try {
        const response = await instance.get(`/restaurant/restaurantDetail/${restaurantid}`);
        setRestaurant(response.data)
      } catch (error) {
        console.error("에러가 발생했습니다. : ", error)
      }
    }
  
    useEffect(() => {
      fetchRestaurantData();
    }, []);
  
    return (
      <div>
        <RestaurantProfile
          restaurant={restaurant}
          reviews={REVIEWS}
        />
        <RestaurantTab reviewCount={REVIEWS.length} />
        <div className="detail">
          <RestaurantInfo restaurant={restaurant} options={OPTIONS}/>
          <RestaurantMenu menus={MENUS} />
          <RestaurantReview reviews={REVIEWS} restaurant={restaurant} />
        </div>
      </div>
    );
}

export default RestaurantDetail