import React, { useEffect, useState } from "react";
import styles from "./MyEatketList.module.css";
import { instance } from "../../api/axios";
import ListCard from "../UI/ListCard";

const MyEatketList = (props) => {
  const data = props.user.restaurantLikeList;
  const [show, setShow] = useState(false);
  const [resarray, setResarray] = useState([]);

  let resName = [];
  data.map((data) => {
    resName.push(data.restaurantName);
  });

  let resInfo = [];

  const resDataFetch = async () => {
    const promises = resName.map(async (res, index) => {
      const { data } = await instance.get(`restaurant/${res}`);
      resInfo.push(data[0]);
    });
    await Promise.all(promises);
  };

  useEffect(() => {
    const dataFetch = async () => {
      await resDataFetch();
      console.log(resInfo);

      resInfo.map((info) => {
        resarray.push(info);
      });

      setShow(true);
    };
    
    dataFetch();
  
  }, [setShow]);

  return (
    show &&
    <div>
      <div className={styles.listCount}>
        저장한 먹킷리스트가 {resarray.length}개 있어요
      </div>
      <ul className={styles.ul}>
        {resarray.map((data) => (
          <li className={styles.list} key={data.busId}>
            <ListCard data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MyEatketList);