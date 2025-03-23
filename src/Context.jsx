import React, { useEffect, useContext, useReducer, useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';  
import reducer from './reducer';
// Base API endpoint
const API = "https://hn.algolia.com/api/v1/search?";

// Initial state
const initialState = {
    isLoading: true,
    query: " ",
    nbPages: 0,
    page: 0,
    hits: [],
    popularNews: [],
};
const AppContext = React.createContext();

// Fetcher function for SWR caching
const fetcher = (url) => fetch(url).then(res => res.json());

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showPopularNews, setShowPopularNews] = useState(false);
    const [bookMark, setBookMark] = useState([]);

    // API fetching with caching
    const { data, error } = useSWR(`${API}query=${state.query}&page=${state.page}`, fetcher);

    // Handle API response
    useEffect(() => {
        if (data) {
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            });
        }
        if (error) {
            console.error("Error fetching data:", error);
        }
    }, [data, error]);

    // Fetch popular news separately with SWR
    const { data: popularData, error: popularError } = useSWR(`${API}query=technology&tags=story`, fetcher);

    useEffect(() => {
        if (popularData) {
            const sortedNews = popularData.hits
                .filter((item) => item.num_comments)
                .sort((a, b) => (b.num_comments || 0) - (a.num_comments || 0))
                .slice(0, 7);

            dispatch({
                type: "GET_POPULAR_NEWS",
                payload: sortedNews,
            });
        }
    }, [popularData, popularError]);

    // Efficient pagination handlers
    const getNextPage = useCallback(() => {
        dispatch({ type: "NEXT_PAGE" });
    }, []);

    const getPrevPage = useCallback(() => {
        dispatch({ type: "PREV_PAGE" });
    }, []);

    // Memoized bookmark management
    const addBookMark = useCallback((news) => {
        const newBookMark = [...bookMark, news];
        setBookMark(newBookMark);
        localStorage.setItem('bookmarks', JSON.stringify(newBookMark));
    }, [bookMark]);

    // Remove bookmark function
    const removeBookMark = useCallback((news) => {
        const updatedBookmarks = bookMark.filter((item) => item.objectID !== news.objectID);
        setBookMark(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }, [bookMark]);

    // Load bookmarks from localStorage on initial render
    useEffect(() => {
        const storedData = localStorage.getItem('bookmarks');
        if (storedData) {
            setBookMark(JSON.parse(storedData));
        }
    }, []);

    // Memoize values for better performance
    const value = useMemo(() => ({
        ...state,
        searchFn: (query) => dispatch({ type: "SEARCH_QUERY", payload: query }),
        getNextPage,
        getPrevPage,
        showPopularNews,
        setShowPopularNews,
        addBookMark,
        removeBookMark,
        bookMark,
        setBookMark,
    }), [state, showPopularNews, bookMark, addBookMark, removeBookMark]);

    // Display error fallback
    if (error || popularError) {
        return <h1>Error loading data. Please try again later.</h1>;
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for accessing context
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };