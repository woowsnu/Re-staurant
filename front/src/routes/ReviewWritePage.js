import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { instance } from '../api/axios';
import Layout from '../component/Layout/Layout';
import Navbar from '../component/Layout/Navbar';
import ReviewWrite from '../component/Review/ReviewWrite';

const ReviewWritePage = () => {
  const restaurant = useLocation().state;

  const body = {
    reviewTitle: null,
    reviewContent: null,
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    instance.post(`/review/${restaurant?.busId}/auth/createReview`, JSON.stringify(body), {
      headers: { Authorization: token },
    });
  }, []);

  return (
    <Layout>
      <Navbar />
      <ReviewWrite />
    </Layout>
  );
};

export default ReviewWritePage;
