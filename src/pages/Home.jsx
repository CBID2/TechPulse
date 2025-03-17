import React from 'react';
import Search from '../Search';
import Stories from '../Stories';
import Pagination from '../Pagination';
import PopularNews from '../PopularNews';
import { useGlobalContext } from '../Context';

import '../App.css';
import "../Navbar.css";

export const Home = () => {
  const { showPopularNews } = useGlobalContext();

  return (
    <>
      {/* Search bar */}
      <Search />

      {/* Pagination */}
      <Pagination />

      {/* News sections */}
      {showPopularNews ? <PopularNews /> : <Stories />}
    </>
  );
}

export default Home;