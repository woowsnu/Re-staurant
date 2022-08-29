import React from "react";

const MyEatketList = () => {
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
      latitude: 12345.6,
      longitude: 123456.7,
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
      menu : [{ id : 1, name : "삼겹살", price : 16000}, { id : 2, name : "항정살", price : 17000} ],
      
    },
    {
      id: 11840561,
      name: "돈사돈",
      phone: "064-746-8989",
      address: "제주 제주시 노형동  3086-3",
      fullRoadAddress: "제주특별자치도 제주시 우평로 19",
      description:
        "저희 돈사돈은 제주도 제주시 노형동에 위치하고 있습니다. 돈사돈의 근고기는 일반 음식점에서 느낄 수 없는 깊은 맛과 멜젓의 조화를 이루고있으며 외지나 해외에서도  많이 찾아 오시는 분들께 맛있는 근고기를 제대로 대접해 드리기 위해 노력하고 있습니다. 돈사돈 근고기의 참맛을 느껴보세요. 최고의 맛으로 모시겠습니다. 감사합니다.",
      bizhourInfo: "매일 12:00~22:00 매주 화요일 휴무",
      category: "한식",
      sns: "instagram.com/donsadon",
      latitude: 12345.6,
      longitude: 123456.7,
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
      imgUrl : "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20160108_30%2F1452234169374ezfXp_JPEG%2F176058555268697_0.jpg",
      menu : [{ id : 1, name : "삼겹살", price : 16000}, { id : 2, name : "항정살", price : 17000} ]
    },
  ];

  return (
    <>
      <ul>
        {RESTURANT_DATA.map((data) => (
          <li>
            {data.address.split(" ", 1) +
              " " +
              data.address.split(" ", 2).slice(1, 2)}{" "}
            <br />
            {data.name} {data.phone}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyEatketList;
