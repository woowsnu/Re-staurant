import React, { useContext } from "react";
import styles from "./SearchNoResult.module.css";
import MainPhotoCard from "../../UI/MainPhotoCard";
import ResContext from "../../../store/res-context";

const SearchNoResult = () => {
  const resCtx = useContext(ResContext);
  console.log(resCtx)
  const topList = resCtx.topRevisit;
  const topRank = resCtx.topRanking;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.resultText}>
           저런! 검색 결과가 없습니다😢 <br/>
           다른 인기 맛집들을 둘러 보시는 건 어떠세요?
        </div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <div className={styles.section}>
          {topList?.map((item) => (
            <MainPhotoCard key={item.restaurantIndex} data={item} editMark={item.statusLike} />
          ))}
        </div>
        <h3>합정 지역 별점 높은 맛집</h3>
        <div className={styles.section}>
          {topRank?.map((item) => (
            <MainPhotoCard key={item.restaurantIndex} data={item} editMark={item.statusLike} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchNoResult;