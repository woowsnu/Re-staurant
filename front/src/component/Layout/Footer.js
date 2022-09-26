import React from 'react';
import styles from './Footer.module.css';
import { FaHome } from 'react-icons/fa';

const Footer = () => {
  return <div className={styles.footer}>
    <div>
      <div>㈜짐승들 </div>
      <div><a href='https://foam-tendency-a06.notion.site/RE-STAURANT-ee29783ffaba4b6593e290616239fc21' target='_blank'> <FaHome /></a></div>
    </div>
  </div>;
};

export default Footer;
