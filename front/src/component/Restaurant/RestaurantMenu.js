import React, { useState } from "react";
import styles from "./RestaurantMenu.module.css";

const RestaurantMenu = (props) => {
  const simpleMenu = props.menus.slice(0, 5);
  const [viewMore, setViewMore] = useState(false);

  const viewMoreHandler = () => {
    setViewMore(!viewMore);
  };

  return (
    <div id="res-menu" className={styles.container}>
      <h3>메뉴정보</h3>
      {!viewMore
        ? simpleMenu.map((menu) => {
            return (
              <ul key={menu.id}>
                <li>
                  <span>{menu.name}</span>
                  <span>---------------</span>
                  <span>{menu.price}</span>
                </li>
              </ul>
            );
          })
        : props.menus.map((menu) => {
            return (
              <ul key={menu.id}>
                <li>
                  <span>{menu.name}</span>
                  <span>---------------</span>
                  <span>{menu.price}</span>
                </li>
              </ul>
            );
          })}
      <button onClick={viewMoreHandler}>
        {viewMore ? "메뉴 접기" : "더보기"}
      </button>
    </div>
  );
};

export default RestaurantMenu;
