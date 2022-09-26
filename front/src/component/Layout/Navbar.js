import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa";

// GNB 역할
const Navbar = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;
  const isMobile = useMediaQuery({ query: "(max-width: 680px)" });

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
        {loginStatus && !isMobile ? (
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
