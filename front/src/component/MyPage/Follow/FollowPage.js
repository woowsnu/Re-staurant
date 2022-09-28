import React, { useState } from "react";
import Modal from "../../UI/Modal";
import { BiArrowBack } from "react-icons/bi";
import styles from "./FollowPage.module.css";
import FollowList from "./FollowList";

const FollowPage = (props) => {
  const [tabselect, setTabselect] = useState(false);

  const showFollower = () => {
    setTabselect(false);
  };
  const showFollowing = () => {
    setTabselect(true);
  };

  const closeModal = () => {
    props.closeModal();
  };

  const user = props.data;

  return (
    <Modal>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <BiArrowBack onClick={closeModal} />
        </div>
        <div className={styles.tabbar}>
          <div className={tabselect ? styles.tab : styles.tabactive}>
            <button
              className={tabselect ? styles.tab : styles.tabactive}
              onClick={showFollower}
            >
              팔로워
            </button>
          </div>
          <div className={tabselect ? styles.tabactive : styles.tab}>
            <button
              className={tabselect ? styles.tabactive : styles.tab}
              onClick={showFollowing}
            >
              팔로잉
            </button>
          </div>
        </div>
        <FollowList user={user} tab={tabselect}/>
      </div>
    </Modal>
  );
};

export default FollowPage;
