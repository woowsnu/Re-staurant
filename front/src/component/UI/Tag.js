import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Tag.module.css';

const Tag = (props) => {
  const { name, icon } = props.item;
  const [search, setSearch] = useState(name);
  const navigate = useNavigate();

  const tagClickHandler = () => {
    navigate(`/search/${name}`, { state: { search: search } });
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
