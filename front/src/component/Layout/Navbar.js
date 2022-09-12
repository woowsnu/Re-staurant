import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import styles from './Navbar.module.css';
// GNB 역할
const Navbar = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;
  const isMobile = useMediaQuery({ query: "(max-width: 680px)" });

  return (
    <div className={styles.container}>
      <div>
        <Link to='/'>
          <img src={require('../../assets/images/logo.png')} alt='logo' />
        </Link>
      </div>
      <div>
        {loginStatus && !isMobile ? (
          <Link to='/mypage'>
            <button className={styles.navbtn}>마이페이지</button>
          </Link>
        ) : (
          <Link to='/login'>
            <button className={styles.navbtn}>회원가입/로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;