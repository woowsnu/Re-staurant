import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logobar.module.css';

const Logobar = () => {

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={require('../../assets/images/logo_big.png')} width="200px" alt='logo' />
        </Link>
      </div>
    </div>
  );
};

export default Logobar;