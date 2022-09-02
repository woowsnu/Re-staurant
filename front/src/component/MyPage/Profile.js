import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import basicimage from "../../images/user.png";
import styles from "./Profile.module.css"
import EditProfile from "./EditProfile";
import AuthContext from "../../store/auth-context";

const Profile = (props) => {
    const [profileimg, setProfileimg] = useState(
        <img src={basicimage} width="100px" />
      );
      const [showModal, setShowModal] = useState(false);
      
      const profileEditHandler = () => {
        setShowModal(true);
      };

      const ctx = useContext(AuthContext);
      let navigate = useNavigate();
      const logout = () => {
        localStorage.removeItem("token");
        ctx.onLogout();
        navigate("/");
      };

      const stateManage = () => {
        props.updateHandler();
      }

  return (
    <>
      <div>
        <h2>마이 페이지</h2>
      </div>
      <div id="profiles" className={styles.profiles}>
        {profileimg}
        <div id="profilesuserinfo" className={styles.userinfo}>
          <h3>{props.user.name}</h3>
          <div id="follow">팔로워 51 &nbsp; &nbsp; 팔로잉 244</div>
        </div>
      </div>
      <div id="mypage_buttons">
        <button onClick={profileEditHandler}>프로필 수정하기</button>
        <button onClick={logout}>로그아웃</button>
      </div>
      {showModal ? (
        <EditProfile
          id={props.user.id}
          nickname={props.user.name}
          closeModal={() => {
            setShowModal(false);
          }}
          stateManage={() => {
            stateManage();
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
