import React, { useEffect, useState } from "react";
import styles from "./MyEatketList.module.css";
import { instance } from "../../api/axios";

const MyEatketList = (props) => {
  const data = props.user.restaurantLikeList;
  const [resarray, setResarray] = useState(false);

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
      console.log(resarray);
      console.log(resInfo);
    };
    dataFetch();
  }, [resarray]);

  return (
    resarray && (
      <div>
        <div className={styles.listCount}>
          저장한 먹킷리스트가 {resInfo.length}개 있어요
        </div>
        <ul className={styles.ul}>
          {resInfo.map((data) => (
            <li className={styles.list} key={data.busId}>
              {data.restaurantName}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default React.memo(MyEatketList);
