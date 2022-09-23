import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../component/Layout/Layout';
import Navbar from '../component/Layout/Navbar';
import Header from '../component/Layout/Header';
import Tag from '../component/UI/Tag';
import PhotoCard from '../component/UI/PhotoCard';
import MainPhotoCard from '../component/UI/MainPhotoCard';
import styles from './HomePage.module.css';
import ResContext from '../store/res-context';
import SmallListCard from '../component/UI/SmallListCard';
import AuthContext from '../store/auth-context';
import { instance } from '../api/axios';

const HomePage = () => {
  const resCtx = useContext(ResContext);
  const topList = resCtx.topRevisit;
  const tagList = resCtx.tags;
  const topRank = resCtx.topRanking;
  console.log(topRank);

  return (
    <Layout>
      <Navbar />
      <Header />
      <div className={styles.container}>
        <h3>합정에서 뭐 먹지? 🤔</h3>
        <div className={styles.tags}>
          {tagList.map((item, i) => {
            return <Tag key={i} item={item} />;
          })}
        </div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <div className={styles.section}>
          {topList?.map((item) => (
            <MainPhotoCard key={item.restaurantIndex} resInfo={item} />
          ))}
        </div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <div className={styles.section}>
          {topList?.map((item) => (
            <MainPhotoCard key={item.restaurantIndex} resInfo={item} />
          ))}
        </div>
        <h3>합정지역 별점 Top 5</h3>
        <div className={styles.rankSection}>
          {topRank.map((item, i) => (
            <Link key={i} to={`/detail/${item.busId}`}>
              <div className={styles.ranking}>
                <span>{i + 1}</span>
                <SmallListCard data={item} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
