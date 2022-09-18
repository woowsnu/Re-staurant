import React, { useState } from 'react';
import Layout from '../component/Layout/Layout';
import Navbar from '../component/Layout/Navbar';
import Header from '../component/Layout/Header';
import Tag from '../component/UI/Tag';
import PhotoCard from '../component/UI/PhotoCard';
import styles from './HomePage.module.css';

const TAG = ['삼겹살', '우동', '카레', '카페', '중식'];
const MANY_REVISIT = [11619295, 13493819, 11678488, 19878437];

const FOLLOW_REVISIT = [ 13097213, 6, 7, 8];

const HomePage = () => {
  //restaurant list fetching (전체 완성 후 호출하는 코드 추가하기)

  //restaurant에서 보내주는 bookmark 값 대체/ 추후 없어질 수 있음
  const [isChecked, setIsChecked] = useState(0);

  //bookmark update 코드
  const updateBookmark = (data) => {
    setIsChecked(data);
  };

  return (
    <Layout>
      <Navbar />
      <Header />
      <div className={styles.container}>
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
    </Layout>
  );
};

export default HomePage;
