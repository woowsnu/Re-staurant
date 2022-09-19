import React, { useContext, useState } from 'react';
import Layout from '../component/Layout/Layout';
import Navbar from '../component/Layout/Navbar';
import Header from '../component/Layout/Header';
import Tag from '../component/UI/Tag';
import PhotoCard from '../component/UI/PhotoCard';
import MainPhotoCard from '../component/UI/MainPhotoCard';
import styles from './HomePage.module.css';
import ResContext from '../store/res-context';

const TAG = ['삼겹살', '우동', '카레', '카페', '중식'];
const MANY_REVISIT = [859857359, 34393996, 31583220, 1508260607];

const FOLLOW_REVISIT = [13097213, 6, 7, 8];

const HomePage = () => {
  const resCtx = useContext(ResContext);
  const topList = resCtx.topRevisit
  //restaurant에서 보내주는 bookmark 값 대체/ 추후 없어질 수 있음
  // const [isChecked, setIsChecked] = useState(0);

  //bookmark update 코드
  // const updateBookmark = (data) => {
  //   setIsChecked(data);
  // };

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
          {topList?.map((item) => (
            <MainPhotoCard
              key={item.restaurantIndex}
              resInfo={item}
            />
          ))}
        </div>
        <h3>친구가 다녀 온 그 곳!</h3>
        <div className={styles.section}>
          {/* {FOLLOW_REVISIT.map((id) => (
            <PhotoCard
              key={id}
              id={id}
            />
          ))} */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
