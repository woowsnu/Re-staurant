import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
