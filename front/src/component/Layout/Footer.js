import React from 'react';
import styles from './Footer.module.css';
import { FaHome, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        <div style={{paddingBottom: '10px'}}>㈜짐승들 </div>
        <div>Copyright ⓒ 2022 Beasts</div>
      </div>
      <div>
        <a
          href='https://foam-tendency-a06.notion.site/RE-STAURANT-ee29783ffaba4b6593e290616239fc21'
          target='_blank'
        >
          <FaHome style={{fontSize: '24px', paddingRight: '12px'}}/>
        </a>
        <a href='https://github.com/woowsnu/Re-staurant'
          target='_blank'>
        <FaGithub style={{fontSize: '24px'}}/>
        </a>
      </div>
    </div>
  );
};

export default Footer;
