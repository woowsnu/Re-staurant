import React from 'react';
import Layout from '../component/Layout/Layout';
import Navbar from '../component/Layout/Navbar';
import ReviewWrite from '../component/Review/ReviewWrite';

const ReviewWritePage = () => {
  return (
    <Layout>
      <Navbar />
      <ReviewWrite />
    </Layout>
  );
};

export default ReviewWritePage;
