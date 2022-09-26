import React from "react";
import styles from "./FollowList.module.css";

const FollowList = (props) => {
  const tab = props.tab;
  
  return (
    <>
      {tab ? (
        <div className={styles.list}>
          {props.user.followingList.map((user) => (
            <li>{user.followedEmail}</li>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {props.user.followerList.map((user) => (
            <li>{user.followingEmail}</li>
          ))}
        </div>
      )}
    </>
  );
};

export default FollowList;
