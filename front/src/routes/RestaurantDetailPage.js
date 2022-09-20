import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../component/Layout/Layout';
import RestaurantDetail from '../component/Restaurant/RestaurantDetail';
import Navbar from '../component/Layout/Navbar';

const RestaurantDetailPage = () => {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <Layout>
      <Navbar />
      <RestaurantDetail />
    </Layout>
  );
};

export default RestaurantDetailPage;
