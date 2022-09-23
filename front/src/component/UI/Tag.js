import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Tag.module.css';

const Tag = (props) => {
  const [search, setSearch] = useState(props.name)
  const navigate = useNavigate();

  const tagClickHandler = () => {
    navigate(`/search/${props.name}`, {state : {search: search}} )
  };

  return (
    <div className={styles.container}>
        <button className={styles.btn} onClick={tagClickHandler}>{props.name}</button>
    </div>
  );
};

export default Tag;

// 검색 api / 태그의 택스트를 쿼리스트링으로 GET 요청 보내기 
// Link to="/api/{props.name}"