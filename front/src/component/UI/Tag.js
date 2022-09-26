import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Tag.module.css';

const Tag = ({name, icon}) => {
  const search = name;
  const navigate = useNavigate();

  const tagClickHandler = () => {
    navigate(`/search/${search}`, { state: { search: search } });
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={tagClickHandler}>
        <h6>{icon}</h6>
        <p>#{name}</p>
      </button>
    </div>
  );
};

export default Tag;