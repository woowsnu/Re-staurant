import React, { useEffect, useState } from 'react';
import { instance } from '../api/axios';

const ResContext = React.createContext({
  topRevisit: [],
  topRanking: [],
  tags: [],
  bookmark: [],
});

export const ResContextProvider = (props) => {
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('accessToken');
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const fetchBookMark = async () => {
      const res = await instance.get(
        `/restaurant/${userEmail}/auth/findUserView`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      setBookmark(res.data);
    };

    if (!!userEmail) {
      fetchBookMark();
    }
  }, [userEmail, token]);

  let topList = [
    {
      restaurantIndex: 1,
      busId: '1836765337',
      restaurantCategory: '음식점 > 양식',
      restaurantName: '스케줄합정',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.39,
    },
    {
      restaurantIndex: 7,
      busId: '34393996',
      restaurantCategory: '일식 > 우동,소바',
      restaurantName: '우동 카덴',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.23,
    },
    {
      restaurantIndex: 8,
      busId: '1287775548',
      restaurantCategory: '한식 > 육류,고기요리',
      restaurantName: '육지',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.78,
    },
    {
      restaurantIndex: 9,
      busId: '1508260607',
      restaurantCategory: '일식 > 돈가스',
      restaurantName: '최강금돈까스',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.58,
    },
  ];

  let ranking = [
    {
      restaurantIndex: 36,
      busId: '38009729',
      restaurantCategory: '한식 > 소고기구이',
      restaurantName: '남고집 합정',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.91,
    },
    {
      restaurantIndex: 54,
      busId: '1954674068',
      restaurantCategory: '음식점 > 카페,디저트',
      restaurantName: '카페163',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.89,
    },
    {
      restaurantIndex: 7,
      busId: '1062472699',
      restaurantCategory: '음식점 > 이탈리아음식',
      restaurantName: '스프링비스트로',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.86,
    },
    {
      restaurantIndex: 24,
      busId: '1552053924',
      restaurantCategory: '이탈리아음식 > 스파게티,파스타전문',
      restaurantName: '묘한식탁',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.86,
    },
    {
      restaurantIndex: 92,
      busId: '1891825973',
      restaurantCategory: '한식 > 곱창,막창,양',
      restaurantName: '형제한우곱창 합정직영점',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.8,
    },
  ];

  const tagList = [
    { name: '한식', icon: '🍲' },
    { name: '중식', icon: '🍜' },
    { name: '일식', icon: '🍣' },
    { name: '양식', icon: '🍕' },
    { name: '술집', icon: '🍺' },
    { name: '카페', icon: '☕' },
  ];

  topList = topList.map((item) => ({ ...item, likeIndex: null }));

  for (let i = 0; i < bookmark.length; i++) {
    for (let j = 0; j < topList.length; j++) {
      if (bookmark[i].busId === topList[j].busId) {
        topList[j].likeIndex = bookmark[i].likeIndex;
      }
    }
  }

  ranking = ranking.map((item) => ({ ...item, likeIndex: null }));
  
  for (let i = 0; i < bookmark.length; i++) {
    for (let j = 0; j < ranking.length; j++) {
      if (bookmark[i].busId === ranking[j].busId) {
        ranking[j].likeIndex = bookmark[i].likeIndex;
      }
    }
  }

  // let restaurantInfo = [];
  // let endpoints = [
  //   'http://localhost:8080/restaurant/restaurantDetail/859857359',
  //   'http://localhost:8080/restaurant/restaurantDetail/34393996',
  //   'http://localhost:8080/restaurant/restaurantDetail/31583220',
  //   'http://localhost:8080/restaurant/restaurantDetail/1508260607',
  // ];

  // useEffect(() => {
  //   const fetchRestaurantInfo = async () => {
  //     axios
  //       .all(endpoints.map((endpoint) => axios.get(endpoint)))
  //       .then(axios.spread((res1, res2, res3, res4) => {
  //           restaurantInfo.push(res1)
  //           restaurantInfo.push(res2)
  //           restaurantInfo.push(res3)
  //           restaurantInfo.push(res4)
  //       }));
  //   };
  //   fetchRestaurantInfo();
  // }, [endpoints]);

  return (
    <ResContext.Provider
      value={{
        topRevisit: topList,
        topRanking: ranking,
        tags: tagList,
        bookmark: bookmark,
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResContext;
