import React from "react";
import Layout from '../component/Layout/Layout';
import Header from '../component/Layout/Header';
import Tag from '../component/UI/Tag';
import PhotoCard from '../component/UI/PhotoCard';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <div>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </div>
      <div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </div>
      <div>
        <h3>맛 보장! 재방문 많은 맛집</h3>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </div>
    </Layout>
  );
};

export default HomePage;
