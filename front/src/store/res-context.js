import React, { useContext, useEffect, useState } from 'react';
import resInfoAPI from '../api/resInfoAPI';
import AuthContext from './auth-context';

const ResContext = React.createContext({
  topRevisit: [],
  topRanking: [],
  tags: [],
  topManyReview: [],
});

export const ResContextProvider = (props) => {
  const [reviewRanking, setReviewRanking] = useState([]);

  useEffect(() => {
    const fetchRank = async () => {
      const data = await resInfoAPI.getRestaurantRank()
      setReviewRanking(data)
    }
    fetchRank();
  }, []);



  let topList = [
    {
      restaurantIndex: 1,
      busId: '1836765337',
      restaurantCategory: '음식점 > 양식',
      restaurantName: '스케줄합정',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.39,
      imgUrl: "https://ldb-phinf.pstatic.net/20220415_104/1649996725771tTgeK_JPEG/1.jpg"
    },
    {
      restaurantIndex: 4,
      busId: '1476397400',
      restaurantCategory: '음식점 > 이탈리아음식',
      restaurantName: '아우룸',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.73,
      imgUrl: "https://ldb-phinf.pstatic.net/20210722_171/1626948896203Jtozc_JPEG/lWej6LJP4rGfa9tQtieLcvfI.JPG.jpg"
    },
    {
      restaurantIndex: 8,
      busId: '1287775548',
      restaurantCategory: '한식 > 육류,고기요리',
      restaurantName: '육지',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.78,
      imgUrl: "https://ldb-phinf.pstatic.net/20220222_95/1645509078854x7pfW_JPEG/5.jpg"
    },
    {
      restaurantIndex: 9,
      busId: '1508260607',
      restaurantCategory: '일식 > 돈가스',
      restaurantName: '최강금돈까스',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.58,
      imgUrl: "https://pup-review-phinf.pstatic.net/MjAyMjA5MjZfMjA0/MDAxNjY0MTY0Mjc2NDAx.L05QFJRZAZDiyhS_pJuZ926a-kSidkkwKV-lCTcoVwgg.o9MBy_9pfTh17pd8vrgsz6RHowog3mPb5scYk6aUiBgg.JPEG/D56F7399-CE56-4FDE-A4C4-2C42B2EBB2C7.jpeg"
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
      imgUrl: "https://pup-review-phinf.pstatic.net/MjAyMjA5MjdfNCAg/MDAxNjY0MjY4NjY5NzQ4.P9rU3eJcFkftpEuQUMX42pku441zHa93xAAXA_7ndEEg.BY_4jpCIT5nxzfNrUoKQ7BYxBNkuauR4AkS9gvLcGIcg.JPEG/Screenshot_20220927-174914_KakaoTalk.jpg"
    },
    {
      restaurantIndex: 54,
      busId: '1954674068',
      restaurantCategory: '음식점 > 카페,디저트',
      restaurantName: '카페163',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.89,
      imgUrl: "https://ldb-phinf.pstatic.net/20220909_87/1662702276980oBvon_JPEG/BE0B6C2C-53C8-4DE3-A9C0-8FE0F3449548.jpeg"
    },
    {
      restaurantIndex: 7,
      busId: '1062472699',
      restaurantCategory: '음식점 > 이탈리아음식',
      restaurantName: '스프링비스트로',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.86,
      imgUrl: "https://pup-review-phinf.pstatic.net/MjAyMjA5MjdfMjkg/MDAxNjY0MjQyMjg2NDI5.6qALwMqGMo5l1t8VyMefCb8Q9-izZ2iQuVo05P_Etr4g.FHJ4aGup-fS17jbQqMnhdxSm5Ofa_wqCfbPOKZUeeW8g.JPEG/4ADD715C-E1A9-4B26-99CD-65DF4E370251.jpeg"
    },
    {
      restaurantIndex: 24,
      busId: '1552053924',
      restaurantCategory: '이탈리아음식 > 스파게티,파스타전문',
      restaurantName: '묘한식탁',
      siCode: '서울특별시',
      guCode: '마포구',
      avgRating: 4.86,
      imgUrl: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA5MjdfMTU3%2FMDAxNjY0MjYwNDgwMTk4.zVhbL1-kA7cIdvhDl4Ya0b-Hvn1LqrTgfyLnXVFaydcg.azyrqbGZD4wVxQy0s5kEQMuZERQfMUExdH81kmU5XlMg.JPEG%2FD14D1DCF-D6DA-4AB8-BB6A-9218DF913C1D.jpeg"
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

  return (
    <ResContext.Provider
      value={{
        topRevisit: topList,
        topRanking: ranking,
        topManyReview: reviewRanking,
        tags: tagList,
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResContext;
