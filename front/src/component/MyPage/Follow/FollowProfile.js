import React, { useState } from "react";
import basicimage from "../../../assets/images/user.png";
import styles from "./FollowProfile.module.css";
import Button from "../../UI/Button";
import Navbar from "../../Layout/Navbar";
import { instance } from "../../../api/axios";

const FollowProfile = (props) => {
  const [profileimg, setProfileimg] = useState(
    <img alt="img" src={basicimage} width="130px" />
  );
console.log(props.followEmail);
  const followSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const profile = { followEmail : props.followEmail }
    instance
      .post("/follow/auth/following", JSON.stringify(profile), {
        headers: { "Content=Type": "application/json", Authorization: token },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          {profileimg}
          <div className={styles.userInfo}>
            <div className={styles.nickname}>{props.user.nickname}</div>(
            {props.user.email})
            <div className={styles.followInfo}>
            팔로워 {props.user.followerList.length} &nbsp; &nbsp; 팔로잉 {props.user.followingList.length} 
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mypageButtons}>
        <Button onClick={followSubmit}>팔로우</Button>&nbsp;&nbsp;
        <Button>언팔로우</Button>
      </div>
      <div className={styles.grayline}>&nbsp;</div>
    </div>
  );
};

export default React.memo(FollowProfile);
