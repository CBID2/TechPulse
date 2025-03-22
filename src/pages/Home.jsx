import React,{lazy, Suspense} from 'react';
import { useGlobalContext } from '../Context';

import '../App.css';
import "../Navbar.css";
import Loader from '../components/Loader';

const Search = lazy(()=>import('../Search'));
const Stories = lazy(()=>import('../Stories'));
const Pagination = lazy(()=>import('../Pagination'));
const PopularNews = lazy(()=>import('../PopularNews'));

export const Home = () => {
  const { showPopularNews } = useGlobalContext();

  return (
    <Suspense fallback={<Loader />}>
      {/* Search bar */}
      <Search />

      {/* Pagination */}
      <Pagination />

      {/* News sections */}
      {showPopularNews ? <PopularNews /> : <Stories />}
    </Suspense>
  );
}

export default Home;