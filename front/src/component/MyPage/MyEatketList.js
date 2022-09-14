import React from "react";
import styles from "./MyEatketList.module.css";
import ListCard from "../UI/ListCard";

const MyEatketList = (props) => {
  return (
    <div>
      {/* <div className={styles.listCount}>저장한 먹킷리스트가 24개 있어요</div>
      <ul className={styles.ul}>
        {props.restaurantdata.map((data) => (
          <li className={styles.list} key={data.id}>
            <ListCard
              imgLink={data.imgUrl}
              name={data.name}
              category={data.category}
              location={data.address.split(" ").splice(0, 2).join(" ")}
              address={data.address}
              phone={data.phone}
              sns={data.sns}
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default React.memo(MyEatketList);
