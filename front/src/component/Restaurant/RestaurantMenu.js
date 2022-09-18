import React, { useState } from 'react';
import styles from './RestaurantMenu.module.css';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const RestaurantMenu = (props) => {
  const simpleMenu = props.menus?.slice(0, 5);
  const [viewMore, setViewMore] = useState(false);
  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  return (
    <div id='res-menu' className={styles.container}>
      <h3>메뉴정보</h3>
      {!viewMore
        ? simpleMenu.map((menu, i) => {
            return (
              <ul key={i}>
                <li>
                  <p>{menu.menuName}</p>
                  <p>{menu.menuPrice}</p>
                </li>
              </ul>
            );
          })
        : props.menus.map((menu, i) => {
            return (
              <ul key={i}>
                <li>
                  <p>{menu.menuName}</p>
                  <p>{menu.menuPrice}</p>
                </li>
              </ul>
            );
          })}
      <div className={styles.viewmore}>
        <button onClick={viewMoreHandler}>
          {viewMore ? (
            <span>
              메뉴 접기 <FaAngleUp />
            </span>
          ) : (
            <span>
              더보기 <FaAngleDown />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
