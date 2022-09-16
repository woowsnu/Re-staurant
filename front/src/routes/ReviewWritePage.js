import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { instance } from '../api/axios';
import Layout from '../component/Layout/Layout';
// import Navbar from '../component/Layout/Navbar';
import Topbar from '../component/UI/Topbar';
import ReviewWrite from '../component/Review/ReviewWrite';

const ReviewWritePage = () => {
  const restaurant = useLocation().state;

  return (
    <Layout>
      <Topbar>리뷰 작성</Topbar>
      <ReviewWrite restaurant={restaurant}/>
    </Layout>
  );
};

export default ReviewWritePage;
