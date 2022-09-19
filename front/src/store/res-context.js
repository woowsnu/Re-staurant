import React, { useEffect } from 'react';
import axios from 'axios';

const ResContext = React.createContext({
  topRevisit: [],
});

export const ResContextProvider = (props) => {
  const topList =[
    {
      restaurantIndex: 1,
      busId: "1836765337",
      restaurantCategory: "음식점 > 양식",
      restaurantName: "스케줄합정",
      siCode: "서울특별시",
      guCode: "마포구",
      avgRating: 4.39,
    },
    {
      restaurantIndex: 7,
      busId: "34393996",
      restaurantCategory: "일식 > 우동,소바",
      restaurantName: "우동 카덴",
      siCode: "서울특별시",
      guCode: "마포구",
      avgRating: 4.23,
    },
    {
      restaurantIndex: 8,
      busId: "31583220",
      restaurantCategory: "일식 > 우동,소바",
      restaurantName: "망원동즉석우동 본점",
      siCode: "서울특별시",
      guCode: "마포구",
      avgRating: 4.46,
    },
    {
      restaurantIndex: 9,
      busId: "1508260607",
      restaurantCategory: "일식 > 돈가스",
      restaurantName: "최강금돈까스",
      siCode: "서울특별시",
      guCode: "마포구",
      avgRating: 4.58,
    }
  ]
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
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResContext;
