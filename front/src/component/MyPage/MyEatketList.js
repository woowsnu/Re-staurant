import React from "react";
import styles from "./MyEatketList.module.css";
import closeimage from "../../images/close.png";

const MyEatketList = (props) => {

  return (
    <>
      <div className={styles.flexcontainer}>
        <ul className={styles.ul}>
          {props.restaurantdata.map((data) => (
            <li className={styles.list} key={data.id}>
              <img className={styles.closebutton} src={closeimage} />
              <span className={styles.listcontent}>
                <img className={styles.img} src={data.imgUrl} />
                {data.name}
                <br />
                {data.category} /&nbsp;
                {data.address.split(" ").splice(0,2).join(" ")}
                <br />
                {data.address}
                <br />
                {data.phone}
                <br />
                {data.sns}
                <br />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyEatketList;
