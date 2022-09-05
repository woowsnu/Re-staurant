import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import basicimage from "../../images/user.png";
import styles from "./Profile.module.css";
import UploadProfilePic from "./UploadProfilePic";
import AuthContext from "../../store/auth-context";
import EditUserInfo from "./EditUserInfo";
import Button from "../UI/Button";

const Profile = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileimg, setProfileimg] = useState(
    <img src={basicimage} width="100px" />
  );
  const [showModal, setShowModal] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const profilePicUplaod = () => {
    setShowModal(true);
  };

  const editUserInfo = () => {
    navigate("/editmyprofile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    ctx.onLogout();
    navigate("/");
  };

  const stateManage = () => {
    props.updateHandler();
  };

  return (
    <>
      <div>
        <h2>마이 페이지</h2>
      </div>
      <div className={styles.logoutbuttonsection}>
      <button className={styles.logoutbutton} onClick={logout}>로그아웃</button>
      </div>
      <div className={styles.profiles}>
        {profileimg}
        <div className={styles.userinfo}>
          {props.user.nickname} <br />({props.user.email})
          <div>팔로워 51 &nbsp; &nbsp; 팔로잉 244</div>
        </div>
      </div>
      <div className={styles.mypagebuttons}>
        <Button onClick={profilePicUplaod}>사진 등록</Button>&nbsp;&nbsp;
        <Button onClick={editUserInfo}>회원정보 수정</Button>
      </div>
      <div className={styles.grayline}>&nbsp;</div>

      {showModal ? (
        <UploadProfilePic
          id={props.user.userIndex}
          email={props.user.email}
          password={props.user.password}
          nickname={props.user.nickname}
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
