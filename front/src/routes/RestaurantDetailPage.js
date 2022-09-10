import React from 'react';
import Layout from '../component/Layout/Layout';
import RestaurantDetail from '../component/Restaurant/RestaurantDetail';
import Navbar from '../component/Layout/Navbar';

const RestaurantDetailPage = () => {
  return (
    <Layout>
      <Navbar />
      <RestaurantDetail />
    </Layout>
  );
};

export default RestaurantDetailPage;
