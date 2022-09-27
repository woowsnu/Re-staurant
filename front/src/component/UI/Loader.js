import React from "react";
import spinner from "../../assets/images/spin_bean.svg";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
        <img src={spinner} width="200px" />
    </div>
  );
};

export default Loader;
