import React, { useState } from "react";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";

const MyPage = () => {
    const [tabselect, setTabselect] = useState(false);
    
    const showReviewsHandler = () => {
        setTabselect();
    }
    const showEatketListHandler = () => {
        setTabselect(true);
    }

  return (
    <>
      <div>
        <h2>마이 페이지</h2>
      </div>
      <div id="_profile">
        <h2>서초동 비스트</h2>
      </div>
      <div id="follow">팔로워 51 &nbsp; &nbsp; 팔로잉 244</div>
      <div id="mypage_buttons">
        <button>프로필 수정하기</button>
        <button>로그아웃</button>
      </div>
      <div id="mypage_tabmenu">
        <ul>
            <li onClick={showReviewsHandler}>작성 리뷰</li>
            <li onClick={showEatketListHandler}>먹킷 리스트 </li>
        </ul>
      </div>
      <div>
        {tabselect ? <MyEatketList /> : <MyReviews/>}
      </div>
    </>
  );
};

export default MyPage;
