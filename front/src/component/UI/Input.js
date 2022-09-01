import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      onChange={props.onChange}
      style={props.style}
      className={styles.input}
    >
      {props.children}
    </input>
  );
};

export default Input;
