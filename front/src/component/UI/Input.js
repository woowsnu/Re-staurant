import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      onChange={props.onChange}
      style={props.style}
      className={styles.input}
      value={props.value}
      placeholder={props.placeholder}
      onFocus={props.onFocus}  />
  );
};

export default Input;
