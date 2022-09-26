import React, { useState } from "react";
import styles from "./SearchNoResult.module.css";
import Tag from "../../UI/Tag";
import PhotoCard from "../../UI/PhotoCard";

const SearchNoResult = () => {
  const TAG = ["삼겹살", "우동", "카레", "까눌레", "중식"];
  const MANY_REVISIT = [1698767904, 1788964881, 1274871069, 37064850];

  const FOLLOW_REVISIT = [5, 6, 7, 8];

  //restaurant에서 보내주는 bookmark 값 대체/ 추후 없어질 수 있음
  const [isChecked, setIsChecked] = useState(0);

  //bookmark update 코드
  const updateBookmark = (data) => {
    setIsChecked(data);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.resultText}>
           저런! 검색 결과가 없습니다😢 <br/>
           다른 인기 메뉴들을 둘러 보시는 건 어떠세요?
        </div>
        <h3>RE:STAURANT 인기 키워드</h3>
        <div className={styles.tags}>
          {TAG.map((item, i) => {
            return <Tag key={i} name={item} />;
          })}
        </div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <div className={styles.section}>
          {MANY_REVISIT.map((id) => (
            <PhotoCard
              key={id}
              id={id}
              isChecked={isChecked}
              updateBookmark={updateBookmark}
            />
          ))}
        </div>
        <h3>친구가 다녀 온 그 곳!</h3>
        <div className={styles.section}>
          {FOLLOW_REVISIT.map((id) => (
            <PhotoCard
              key={id}
              id={id}
              isChecked={isChecked}
              updateBookmark={updateBookmark}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchNoResult;
