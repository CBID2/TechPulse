import React, { useState, useCallback, memo } from 'react';
import { useGlobalContext } from './Context';

const Pagination = () => {
  const { page, nbPages, getPrevPage, getNextPage, setShowPopularNews, showPopularNews } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      getPrevPage();
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [getPrevPage, isLoading]);

  const handleNext = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      getNextPage();
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [getNextPage, isLoading]);

  return (
    <>
      {
        !showPopularNews && (
          <div className="pagination-btn">
            <button 
              onClick={handlePrev} 
              disabled={page <= 0 || isLoading} 
              className={isLoading ? 'loading' : ''}
            >
              Prev
            </button>
            
            <p>{page + 1} of {nbPages}</p>
            
            <button 
              onClick={handleNext} 
              disabled={page >= nbPages - 1 || isLoading} 
              className={isLoading ? 'loading' : ''}
            >
              Next
            </button>
          </div>
        )
      }
      
      <div className="popular-btn">
        <button 
          onClick={() => setShowPopularNews(!showPopularNews)} 
          style={{ margin: '2rem' }}
        >
          { !showPopularNews ? '🔥 Trending Tech News' : '🏠 Back to Home' }
        </button>
      </div>
    </>
  );
};

export default memo(Pagination);