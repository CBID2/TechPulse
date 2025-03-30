import React from 'react';
import { useGlobalContext } from './Context';

const PopularNews = () => {
    const { isLoading, popularNews, fontSize, readingMode } = useGlobalContext();

    if (isLoading) {
        return <p>Loading popular news...</p>;
    }

    return (
        <div className="popular-news-section">
            <h2>🔥 Trending Tech News</h2>
            {popularNews.length > 0 ? (
                <ul>
                    {popularNews.map((news) => (
                        <li key={news.objectID} className="news-item">
                            <a href={news.url} target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontSize: readingMode === true ? `${fontSize}px` : "",
                                }}
                            >
                                {news.title}
                            </a>
                            <span className="badge"
                                style={{
                                    fontSize: readingMode === true ? `${fontSize}px` : "",
                                }}
                            >💬 {news.num_comments || 0} comments</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No popular news available.</p>
            )}
        </div>
    );
};

export default PopularNews;
