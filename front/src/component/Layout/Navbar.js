import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import styles from './Navbar.module.css';
// GNB 역할
const Navbar = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;

  return (
    <div className={styles.container}>
      <div>
        <img src='#' alt='logo' />
      </div>
      <div>
        {loginStatus ? (
          <Link to='/'>
            <button className={styles.navbtn}>마이페이지</button>
          </Link>
        ) : (
          <Link to='/'>
            <button className={styles.navbtn}>회원가입/로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
