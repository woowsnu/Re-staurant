import React, { useContext, useEffect, useState } from 'react';
import resInfoAPI from '../api/resInfoAPI';
import AuthContext from './auth-context';

const ResContext = React.createContext({
  topRevisit: [],
  topRanking: [],
  tags: [],
  bookmark: [],
});

export const ResContextProvider = (props) => {
  const ctx = useContext(AuthContext);
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const fetchBookMark = async () => {
      const data = await resInfoAPI.getUserBookMark()
      setBookmark(data);
    };

    if (ctx.isLoggedIn === 1 && localStorage.getItem("accessToken") !== undefined) {
      fetchBookMark();
    }
  }, [ctx]);

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
      restaurantIndex: 4,
      busId: '1476397400',
      restaurantCategory: '음식점 > 이탈리아음식',
      restaurantName: '아우룸',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.73,
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

  topList = topList.map((item) => ({ ...item, statusLike: null }));

  for (let i = 0; i < bookmark.length; i++) {
    for (let j = 0; j < topList.length; j++) {
      if (bookmark[i].busId === topList[j].busId) {
        topList[j].statusLike = bookmark[i].statusLike;
      }
    }
  }

  ranking = ranking.map((item) => ({ ...item, statusLike: null }));
  
  for (let i = 0; i < bookmark.length; i++) {
    for (let j = 0; j < ranking.length; j++) {
      if (bookmark[i].busId === ranking[j].busId) {
        ranking[j].statusLike = bookmark[i].statusLike;
      }
    }
  }

  return (
    <ResContext.Provider
      value={{
        topRevisit: topList,
        topRanking: ranking,
        tags: tagList,
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResContext;
