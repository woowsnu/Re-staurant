import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Tag.module.css';

const Tag = (props) => {
  return (
    <div className={styles.container}>
      {/* <Link to={props.children}> */}
        <button className={styles.btn}>{props.name}</button>
      {/* </Link> */}
    </div>
  );
};

export default Tag;

// 검색 api / 태그의 택스트를 쿼리스트링으로 GET 요청 보내기 
// Link to="/api/{props.name}"