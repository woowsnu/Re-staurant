import React, { useState }  from 'react'
import styles from "./EditPassword.module.css";
import Input from "../../UI/Input";

const EditPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewPassword(e.target.value);
  };
  return (
    <div>
      <div className={styles.passwordedit}>
        <label htmlFor="password">비밀번호</label>
        <Input
          id="password"
          type="password"
          value={newPassword}
          onChange={passwordChangeHandler}
        />
      </div>
    </div>
  );
};

export default EditPassword;