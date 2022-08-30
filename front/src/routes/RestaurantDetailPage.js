import React, { useState } from "react";
import RestaurantProfile from "../component/Restaurant/RestaurantProfile";
import RestaurantInfo from "../component/Restaurant/RestaurantInfo";
import RestaurantMenu from "../component/Restaurant/RestaurantMenu";
import RestaurantReview from "../component/Restaurant/RestaurantReview";
import RestaurantTab from "../component/Restaurant/RestaurantTab";

const RESTURANT_DATA = [
  {
    id: 19774046,
    name: "남영돈",
    phone: "02-793-3598",
    address: "서울 용산구 남영동 52-2",
    fullRoadAddress: "서울특별시 용산구 한강대로80길 17",
    description:
      "남영돈은 체인점이었던 예쁜돼지 남영점이 새롭게 리뉴얼한 상호입니다. 남영동에 있어서 남영돈으로 단순하게 지은것 같지만 남영돈의 한문을 풀이해보면 囕盈豚으로 입에 넣어 가득찬 돼지고기라는 뜻이 됩니다. 남영돈은 30년 전통의 참숯 화로 전문점입니다. 참숯 화로에 구워진 고기 맛은 그야말로 환상적입니다. 직화에서 나오는 불맛이 고기에 입혀져 고소함이 타에 추종을 불허합니다. 반찬 종류도 최근 고깃집에서 유행하는 스타일이 아니고 백김치에 조개젓을 더해서 감칠맛과 영양까지 생각을 했습니다. 고기를 주문하면 서비스로 내주는  김치찌개도 훌륭합니다.",
    bizhourInfo: "평일 16:00~22:00 | 일요일 14:00~22:00 | 토요일 14:00~22:00",
    category: "한식",
    sns: "instagram.com/namyeongdon",
    latitude: 37.5427497,
    longitude: 126.9737685,
    options: [
      {
        id: 2,
        name: "주차",
        isCheck: "1",
        order: 1,
        iconURL: "http://static.naver.net/maps2/ic_endinfo2.png",
        desc: "",
      },
      {
        id: 4,
        name: "포장",
        isCheck: "1",
        order: 3,
        iconURL: "http://static.naver.net/maps2/ic_endinfo4.png",
        desc: "",
      },
    ],
    imgUrl:
      "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg",
    menu: [
      { id: 1, name: "삼겹살", price: 16000 },
      { id: 2, name: "항정살", price: 17000 },
      { id: 3, name: "목살", price: 16000 },
      { id: 4, name: "갈매기살", price: 17000 },
      { id: 5, name: "우삼겹", price: 15000 },
      { id: 6, name: "껍데기", price: 7000 },
      { id: 7, name: "된장찌개", price: 6000 },
      { id: 8, name: "소주", price: 4000 },
    ],
    reviews: [
      {
        id: 1,
        user: {
          userId: 1,
          name: "서초동 비스트",
          profileImg:
            "https://item.kakaocdn.net/do/1de373d43a00ab0a7aba7e149b2142c3d0bbab1214a29e381afae56101ded106",
        },
        comment: "맛있어요",
        review: "웨이팅 있지만 맛은 굿",
        date: "2022-08-12",
        revisit: 1,
        img: [
          {
            id: 1,
            url: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg",
          },
          {
            id: 1,
            url: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg",
          },
        ],
      },
      {
        id: 2,
        user: {
          userId: 2,
          name: "My 동석",
          profileImg:
            "https://item.kakaocdn.net/do/1de373d43a00ab0a7aba7e149b2142c3d0bbab1214a29e381afae56101ded106",
        },
        comment: "맛없어요",
        review: "다신 안가용",
        date: "2022-08-13",
        revisit: 0,
        img: [
          {
            id: 1,
            url: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg",
          },
        ],
      },
      {
        id: 3,
        user: {
          userId: 3,
          name: "한섬만두",
          profileImg:
            "https://item.kakaocdn.net/do/1de373d43a00ab0a7aba7e149b2142c3d0bbab1214a29e381afae56101ded106",
        },
        comment: "재방문 의사 100%",
        review: "두그릇 뚝딱 했어요",
        date: "2022-08-11",
        revisit: 1,
        img: [
          {
            id: 1,
            url: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180124_9%2F1516772458748vjMWa_JPEG%2FQ5SNtPm-CjeOJtPhGeSXlMYT.jpg",
          },
        ],
      },
    ],
  },
];

const RestaurantDetailPage = () => {
  const [data, setData] = useState(RESTURANT_DATA[0]);
  return (
    <div>
      <RestaurantProfile data={data} />
      <RestaurantTab reviewCount={data.reviews.length} />
      <div className="detail">
        <RestaurantInfo data={data} />
        <RestaurantMenu menus={data.menu} />
        <RestaurantReview reviews={data.reviews} data={data}/>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
