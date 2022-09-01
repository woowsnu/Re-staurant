import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";
import styles from "./MyPage.module.css";
import basicimage from "../images/user.png";
import axios from "../api/axios";
import EditProfile from "../component/MyPage/EditProfile";

const MyPage = () => {
  const [tabselect, setTabselect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [profileimg, setProfileimg] = useState(
    <img src={basicimage} width="100px" />
  );
  const [isUpdated, setIsUpdated] = useState(false);

  const showReviewsHandler = () => {
    setTabselect();
  };
  const showEatketListHandler = () => {
    setTabselect(true);
  };

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const profileEditHandler = () => {
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/restaurant")
      .then(function (response) {
        const data = response.data;
        setRestaurant(data);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/user")
      .then(function (response) {
        const data = response.data[0];
        setUser(data);
        setDatafetch(true);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [isUpdated]);

  return (
    datafetch && (
      <div className={styles.wrap}>
        <section className={styles.section}>
          <div>
            <h2>마이 페이지</h2>
          </div>
          <div id="profiles" className={styles.profiles}>
            {profileimg}
            <div id="profilesuserinfo" className={styles.userinfo}>
              <h3>{user.name}</h3>
              <div id="follow">팔로워 51 &nbsp; &nbsp; 팔로잉 244</div>
            </div>
          </div>
          <div id="mypage_buttons">
            <button onClick={profileEditHandler}>프로필 수정하기</button>
            <button onClick={logout}>로그아웃</button>
          </div>
          {showModal ? (
              <EditProfile
                id={user.id}
                nickname={user.name}
                closeModal={() => {
                  setShowModal(false);
                }}
                stateManage={() => {
                  setIsUpdated(true);
                }}
              />
          ) : (
            ""
          )}
          <div id="mypage_tabmenu" className={styles.tabmenu}>
            <ul className={styles.tabbar}>
              <li onClick={showReviewsHandler}>작성 리뷰</li>
              <li onClick={showEatketListHandler}>먹킷 리스트 </li>
            </ul>
          </div>
          <div>
            {tabselect ? (
              <MyEatketList restaurantdata={restaurant} />
            ) : (
              <MyReviews userdata={user} />
            )}
          </div>
        </section>
      </div>
    )
  );
};

export default MyPage;
