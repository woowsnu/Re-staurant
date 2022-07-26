import React, { useState } from "react";
import basicimage from "../../../assets/images/user.png";
import styles from "./FollowProfile.module.css";
import Button from "../../UI/Button";
import Navbar from "../../Layout/Navbar";
import FollowPage from "./FollowPage";
import { instance } from "../../../api/axios";
import { FaHeart } from "react-icons/fa";

const FollowProfile = (props) => {
  const [profileimg, setProfileimg] = useState(
    <img alt="img" src={basicimage} width="130px" />
  );
  console.log(props);
  const [showFollow, setShowFollow] = useState(false);

  const showFollowList = () => {
    setShowFollow(true);
  };

  const followerList = props.user.followerList;
  let followCheck = followerList.find(
    (e) => e.followingEmail === localStorage.getItem("email") && e.removed === 1
  );

  const updateHandler = () => {
    props.updateHandler();
  };

  const token = localStorage.getItem("accessToken");
  const profile = { followingEmail: props.followEmail };

  const followSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/api/auth/following", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((res) => {
        updateHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowSubmit = (e) => {
    e.preventDefault();
    instance
      .put("/api/auth/unFollowing", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((res) => {
        console.log(res);
        updateHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const follower = props.user.followerList?.filter((f) => f.removed === 1);
  const following = props.user.followingList?.filter((f) => f.removed === 1);

  return (
    <div>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          {profileimg}
          <div className={styles.userInfo}>
            <div className={styles.nickname}>
              {props.user.nickname}
              {followCheck !== undefined ? (
                <span className={styles.followed}>
                  <Button onClick={unfollowSubmit}>
                    <FaHeart />
                  </Button>
                </span>
              ) : (
                <span className={styles.notFollowed}>
                  <Button onClick={followSubmit}>
                    <FaHeart />
                  </Button>
                </span>
              )}
            </div>
            ({props.user.email})
            <div className={styles.followInfo} onClick={showFollowList}>
              팔로워 {follower.length} &nbsp; &nbsp; 팔로잉 {following.length}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grayline}>&nbsp;</div>
      {showFollow ? (
        <FollowPage
          data={props.user}
          closeModal={() => {
            setShowFollow(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(FollowProfile);
