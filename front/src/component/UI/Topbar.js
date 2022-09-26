import React from 'react';
import styles from './Topbar.module.css'

const Topbar = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Topbar;
