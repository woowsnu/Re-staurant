import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa";

// GNB 역할
const Navbar = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;

  return (
    <div className={styles.container}>
      <div>
        <Link to="/">
          <img
            src={require("../../assets/images/logo_big.png")}
            width="180px"
            alt="logo"
          />
        </Link>
      </div>
      <div className={styles.navIcons}>
        {loginStatus ? (
          <Link to="/mypage">
              <FaUserCircle />
          </Link>
        ) : (
          <Link to="/login">
            <FaUserCircle />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
