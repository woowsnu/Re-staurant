import React from "react";
import styles from "./FollowList.module.css";

const FollowList = (props) => {
  const tab = props.tab;
  const following = [];
  const follower = [];
  props.user.followingList.map((f) => {
    if (f.removed === 1) {
      following.push(f);
    }
  });
  props.user.followerList.map((f) => {
    if (f.removed === 1) {
      follower.push(f);
    }
  });

  return (
    <>
      {tab ? (
        <div className={styles.list}>
          {following.map((user) => (
            <li>{user.followedEmail}</li>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
        {follower.map((user) => (
          <li>{user.followingEmail}</li>
        ))}
      </div>
      )}
    </>
  );
};

export default FollowList;
