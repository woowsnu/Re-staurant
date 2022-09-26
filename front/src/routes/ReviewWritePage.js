import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../component/Layout/Layout';
import Topbar from '../component/UI/Topbar';
import ReviewWrite from '../component/Review/ReviewWrite';

const ReviewWritePage = () => {
  const { pathname } = useLocation();
  const restaurant = useLocation().state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <Topbar>리뷰 작성</Topbar>
      <ReviewWrite restaurant={restaurant}/>
    </Layout>
  );
};

export default ReviewWritePage;
